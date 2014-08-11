/*
 * grunt-codebabyscanner
 * https://github.com/jasonbrodie/codebabyscanner
 *
 * Copyright (c) 2014 jason.brodie
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {
    var fs = require('fs');
    var path = require('path');
    var colors = require('colors');
    var Table = require('cli-table');
    var _ = require('underscore');
    global.acorn = require('scanjs/client/js/lib/acorn');
    global.acorn.walk = require('scanjs/client/js/lib/walk');
    var ScanJS = require('scanjs/common/scan');
    var signatures = JSON.parse(fs.readFileSync("./node_modules/scanjs/common/rules.json", "utf8"));

    var windowWidth = process.stdout.getWindowSize()[0]/2 - 2; // - 2 for padding

    grunt.registerMultiTask('scan', 'Tool to scan JavaScript files and check for security issues.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            signatures: {}
        });

        var finalSignatures = _.extend({}, signatures, options.signatures);

        ScanJS.loadRules(finalSignatures);

        // Log the beginning of our table
        var table = new Table({
            head: ['Filename:'.cyan, 'Results:'.cyan],
            colWidths: [windowWidth, windowWidth]
        });


        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            // Concat specified files.
            var finalPath;
            var src = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                // Read file source.
                finalPath = filepath;
                return grunt.file.read(filepath);
            }).join(grunt.util.normalizelf(','));

            // Handle options.
            var scanResult = ScanJS.scan(src, finalPath);
            if(typeof scanResult[0] === 'undefined') {
                table.push(
                    [finalPath.yellow, 'Secure'.green]
                );
            } else {
                var errorMsg = 'Insecure\n'.red;
                _.each(scanResult, function(error) {
                    var details = {
                        rule: error.rule.name,
                        line: error.line,
                        snippet: error.snippet
                    };
                    errorMsg += JSON.stringify(details, null, 2).white;
                });
                table.push(
                    [finalPath.yellow, errorMsg]
                );
            }

        });

        // Output results
        grunt.log.write(table.toString());

    });

};

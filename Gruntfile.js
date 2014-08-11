/*
 * codebaby-scanner
 * https://github.com/jason-brodie-codebaby/codebaby-scanner
 *
 * Copyright (c) 2014 jason.brodie
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Configuration to be run (and then tested).
        scan: {
            dev: {
                options: {
                    signatures: {

                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: 'tmp/',
                        src: ['**/*.js'],
                        ext: '.js'
                    },
                ]
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['scan']);

};

# grunt-codebaby-scanner

> Tool to scan JavaScript files and check for security issues.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-codebaby-scanner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-codebaby-scanner');
```

## The "scan" task

### Overview
In your project's Gruntfile, add a section named `scan` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    scan: {
        options: {
            signatures: {
                // Put in extra security rules here for the scan
            }
        },
        your_target: {
            // Target-specific file lists and/or options go here.
        },
    },
});
```

### Options

#### options.signatures
Type: `String`
Default value: `null`

An object with more rules for the scan. See [here](https://github.com/mozilla/scanjs#rule-syntax) for more info

### Usage Examples

#### Default Usage
```js
grunt.initConfig({
    scan: {
        options: {},
        files: [
            {
                expand: true,
                cwd: 'tmp/',
                src: ['**/*.js'],
                ext: '.js'
            },
        ]
    },
});
```

#### Custom Signature Usage
```js
grunt.initConfig({
    scan: {
        options: {
            signatures: {
                {
                  "name": "property",
                  "source": "$_any.foo",
                  "testhit": "a.foo; a.b.foo; this['foo'];this['bar'].foo;",
                  "testmiss": "foo;",
                  "desc": "Matches object with property of same name.",
                  "threat": "example"
                }
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
    },
});
```
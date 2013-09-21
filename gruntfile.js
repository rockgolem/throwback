/*global module:false*/

/**
 * Javascript Project Boilerplate
 * Version 0.1.0
 */
module.exports = function(grunt) {
    "use strict";
    var pkg, config;

    pkg = grunt.file.readJSON('package.json');

    config = {
        banner : [
            '/**\n',
            ' * <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n',
            ' * <%= pkg.description %>\n',
            ' *\n',
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n',
            ' * Licensed <%= pkg.license %>\n',
            ' */\n'
        ].join(''),

        sources : {
            js : [
                'src/chrome/intro.js',
                'src/throwback.js',
                'src/base.js',
                'src/bootstrap.js',
                'src/timer.js',
                'src/game.js',
                'src/node.js',
                'src/nodes/*',
                'src/animation.js',
                'src/sprite.js',
                'src/audio.js',
                'src/audio/*',
                'src/chrome/export.js',
                'src/chrome/outro.js'
            ],
            css : [
                'src/css/*'
            ]
        },
        pkg : pkg,
        uglifyFiles : {}
    };

    // setup dynamic filenames
    config.versioned = [config.pkg.name, config.pkg.version].join('-');
    config.dist = ['dist/', '.js'].join(config.versioned);
    config.distCss = 'dist/css/throwback.css';
    config.example = ['examples/js/', '-latest.js'].join(config.pkg.name);
    config.uglifyFiles[['dist/', '.min.js'].join(config.versioned)] = config.dist;

    // Project configuration.
    grunt.initConfig({
        pkg : config.pkg,
        lint : {
            files : ['gruntfile.js', 'test/*.js', 'src/*']
        },
        clean : {
            dist : ['dist/']
        },
        concat : {
            options : {
                stripBanners : true,
                banner : config.banner
            },
            js : {
                src : config.sources.js,
                dest : config.dist
            },
            css : {
                src : config.sources.css,
                dest : config.distCss
            }
        },
        copy : {
            example : {
                files : [
                    { 'examples/js/throwback-latest.js' : config.dist },
                    { 'examples/js/jquery.min.js' : 'vendor/jquery.min.js' },
                    { 'examples/css/throwback.css' : config.distCss }
                ]
            }
        },
        uglify : {
            options : { mangle : true },
            dist : {
                files : config.uglifyFiles
            }
        },
        jasmine : {
            tests : {
                src : ['dist/', '.js'].join(config.versioned),
                options : {
                    specs : 'test/spec/*.spec.js',
                    template : 'test/grunt.tmpl',
                    vendor : 'vendor/jquery.min.js'
                }
            }
        },
        jshint : {
            options : {
                jshintrc : 'jshint.json'
            },
            source : config.dist
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task.
    grunt.registerTask('default', ['clean', 'concat', 'jshint', 'copy', 'uglify', 'jasmine']);
};
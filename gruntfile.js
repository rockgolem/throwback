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
                'src/render.js',
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
                'src/css/normalize.css',
                'src/css/base.css'
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
    config.minifiedName = ['dist/', '.min.js'].join(config.versioned);
    config.uglifyFiles[config.minifiedName] = config.dist;

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
            src : {
                src : config.sources.js,
                dest : config.dist
            },
            vendor : {
                src : [
                    'vendor/requestAnimationFrame.js',
                    config.dist,
                    'vendor/numeric.js'
                ],
                dest : config.dist
            },
            vendorMin : {
                src : [
                    config.minifiedName,
                    'vendor/numeric.min.js'
                ],
                dest : config.minifiedName
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
        cssmin : {
            combine : {
                options : {
                    banner : config.banner,
                    keepSpecialComments : 1
                },
                files : {
                    'dist/css/throwback.css' : config.sources.css
                }
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
                    vendor : [
                        'vendor/jquery.min.js',
                        'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min.js'
                    ]
                }
            }
        },
        jsbeautifier : {
            files : [config.dist],
            options : {
                indent_size : 4,
                indent_char : " ",
                indent_level : 0,
                indent_with_tabs : false,
                preserve_newlines : true,
                max_preserve_newlines : 10,
                jslint_happy : true,
                brace_style : 'collapse',
                keep_array_indentation : false,
                keep_function_indentation : false,
                space_before_conditional : true,
                break_chained_methods : false,
                eval_code : false,
                wrap_line_length : 0,
                unescape_strings : false
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
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // non-contrib npm tasks
    grunt.loadNpmTasks('grunt-jsbeautifier');

    // Default task.
    grunt.registerTask('default', [
        'clean', 'concat:src', 'jshint', 'concat:vendor',
        'uglify', 'jsbeautifier', 'concat:vendorMin',
        'cssmin', 'copy', 'jasmine'
    ]);
};

'use strict';

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

var webpackDistConfig = require('./webpack.dist.config.js'),
    webpackDevConfig = require('./webpack.config.js');

module.exports = function (grunt) {
    // Let *load-grunt-tasks* require everything
    require('load-grunt-tasks')(grunt);

    // Read configuration from package.json
    var pkgConfig = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkgConfig,

        sass:{
            dev:{
                files:[{
                    expand:true,
                    cwd:'src/styles',
                    src:['*.scss'],
                    dest:'src/styles/css',
                    ext: '.css'
                }]
            }
        },

        webpack: {
            options: webpackDevConfig,
            dist: {
                cache: false
            }
        },

        'webpack-dev-server': {
            options: {
                hot: true,
                port: 8000,
                webpack: webpackDevConfig,
                publicPath: '/assets/',
                contentBase: './<%= pkg.src %>/',
                historyApiFallback: true
            },

            start: {
                keepAlive: true
            }
        },

        connect: {
            options: {
                port: 8000
            },

            dist: {
                options: {
                    keepalive: true,
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, pkgConfig.dist)
                        ];
                    }
                }
            },

            mocks: {
                options:{
                    livereload:true,
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, pkgConfig.src)
                        ];
                    }
                }
            }
        },

        open: {
            options: {
                delay: 500
            },
            dev: {
                path: 'http://localhost:<%= connect.options.port %>/webpack-dev-server/'
            },
            dist: {
                path: 'http://localhost:<%= connect.options.port %>/'
            },
            mocks:{
                path: 'http://localhost:<%= connect.options.port %>/mocks'
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        copy: {
            dist: {
                files: [
                    // includes files within path
                    {
                        flatten: true,
                        expand: true,
                        src: ['<%= pkg.src %>/*'],
                        dest: '<%= pkg.dist %>/',
                        filter: 'isFile'
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: ['<%= pkg.src %>/images/*'],
                        dest: '<%= pkg.dist %>/images/'
                    }
                ]
            },
            dev: {
                files: [
                    {
                        flatten: true,
                        expand: true,
                        src: ['<%= pkg.src %>/index.html'],
                        dest: '<%= pkg.dist %>/',
                        filter: 'isFile'
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: ['<%= pkg.src %>/images/*'],
                        dest: '<%= pkg.dist %>/images/'
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: ['<%= pkg.src %>/styles/css/**'],
                        dest: '<%= pkg.dist %>/styles/css'
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: ['<%= pkg.src %>/styles/fonts/**'],
                        dest: '<%= pkg.dist %>/styles/fonts'
                    }
                ]
            }


        },

        injector:{
            mocks:{
                options:{
                    transform: function (filename) {
                        filename = filename.replace("src", "").replace(/^\/*/ ,"");
                        if(/.html$/.test(filename)){
                            return '<link rel="import" href="/' + filename + '">';
                        }
                        if(/.css$/.test(filename)){
                            return '<link rel="stylesheet" href="/' + filename + '">';
                        }
                        if(/.js$/.test(filename)){
                            return '<script src="/' + filename + '"></script>';
                        }
                    }
                },
                files:{
                    "src/mocks/index.html":["src/mocks/mock_scripts/*.js", "src/styles/css/*.css" ],
                    "src/mocks/tickets-search.html":["src/styles/css/*.css"],
                    "src/mocks/loading.html": ["src/styles/css/*.css"]
                }
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= pkg.dist %>'
                    ]
                }]
            }
        },

        watch: {
            mocks:{
                options:{ livereload:true },
                files:["src/mocks/*.html", "src/styles/css/*.css", "src/mocks/mock_scripts/*.js"],
                tasks:[]
            },
            sass:{
                files:["src/styles/*.scss"],
                tasks:["sass:dev"]
            },
            jsDev: {
                files: ["src/**/*.js", "src/**/*.jsx"],
                tasks: ["webpack"]
            }

        },

        'http-server': {
            dev: {
                root: "./dist",
                port: 8000,
                runInBackground: true
            }
        }
    });

    //grunt.registerTask('serve', function (target) {
    //    if (target === 'dist') {
    //        return grunt.task.run(['build', 'open:dist', 'connect:dist']);
    //    }
    //
    //    grunt.task.run([
    //        'open:dev',
    //        'webpack-dev-server'
    //    ]);
    //});

    grunt.registerTask('test', ['karma']);

    grunt.registerTask('build', ['clean', 'copy', 'webpack']);

    grunt.registerTask('default', []);

    grunt.registerTask('dev', ['clean', 'webpack', 'copy:dev', "http-server:dev", "watch:jsDev"]);

    grunt.registerTask('mocks', ["sass:dev", "injector:mocks","connect:mocks", "open:mocks", "watch"]);

};

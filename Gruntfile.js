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
            options: webpackDistConfig,
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
                contentBase: './<%= pkg.src %>/'
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
                    "src/mocks/index.html":["src/styles/css/*.css"]
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
                files:["src/mocks/*.html", "src/styles/css/*.css"],
                tasks:[]
            },
            sass:{
                files:["src/styles/*.scss"],
                tasks:["newer:sass:dev"]
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open:dist', 'connect:dist']);
        }

        grunt.task.run([
            'open:dev',
            'webpack-dev-server'
        ]);
    });

    grunt.registerTask('test', ['karma']);

    grunt.registerTask('build', ['clean', 'copy', 'webpack']);

    grunt.registerTask('default', []);

    grunt.registerTask('mocks', ["sass:dev", "injector:mocks","connect:mocks", "open:mocks", "watch"]);

};

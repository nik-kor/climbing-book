module.exports = function(grunt) {

    var karmaConfig = function(configFile, customOptions) {
        var options = { configFile: configFile, keepalive: true };
        var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
        return grunt.util._.extend(options, customOptions, travisOptions);
    };


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        app_js_path: 'cli/app/**/*.js',
        concat_sourcemap: {
            options: {
                sourcesContent: true
            },
            js: {
                files: {
                    'public/js/app.js': [
                        'cli/bower_components/jquery/dist/jquery.js',
                        'cli/bower_components/jquery-ui/ui/jquery-ui.js',
                        'cli/bower_components/angular/angular.js',
                        'cli/bower_components/angular-route/angular-route.js',
                        'cli/bower_components/bootstrap/dist/js/bootstrap.js',
                        'cli/bower_components/fullcalendar/fullcalendar.js',
                        'cli/bower_components/angular-ui-calendar/src/calendar.js',
                        'cli/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                        'cli/bower_components/angular-flash/dist/angular-flash.js',
                        'cli/app/bootstrap.js',
                        '<%= app_js_path %>',
                        'public/js/template-cache.js',
                    ]
                }
            },
            css: {
                files: {
                    'public/css/app.css': [
                        'cli/bower_components/bootstrap/dist/css/bootstrap.css',
                        'cli/bower_components/fullcalendar/fullcalendar.css'
                    ]
                }
            }
        },
        jshint: {
            files: ['<%= app_js_path %>'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        ngtemplates: {
            app: {
                cwd: 'cli/app',
                src: '**/*.html',
                dest: 'public/js/template-cache.js'
            }
        },
        ngmin: {
            js: {
                src: 'public/js/app.js',
                dest: 'public/js/app.js'
            }
        },
        watch: {
            js: {
                files: ['<%= app_js_path %>'],
                tasks: ['concat_sourcemap:js']
            },
            css: {
                files: ['app/**/*.css'],
                tasks: ['concat_sourcemap:css']
            },
            lint: {
                files: ['<%= app_js_path %>'],
                tasks: ['jshint']
            },
            pages: {
                files: ['cli/index.us'],
                tasks: ['page']
            },
            ngtemplates: {
                files: 'cli/app/**/*.html',
                tasks: ['ngtemplates', 'concat_sourcemap:js']
            },
            server: {
                files: ['server/**/*.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            }
        },
        express: {
            options: {
                // background: false,
                port: 3000
            },
            dev: {
                options: {
                    script: 'server/index.js'
                }
            }
        },
        karma: {
            unit: { options: karmaConfig('cli/test/config/unit.js') },
            watch: { options: karmaConfig('cli/test/config/unit.js', { singleRun: false, autoWatch: true}) }
        }
    });

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-concat-sourcemap');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('fonts', function() {
        var fs = require('fs'),
            fontsDir = 'cli/bower_components/bootstrap/dist/fonts/',
            publicDir = 'public/fonts/';

        grunt.file.mkdir(publicDir);

        fs.readdirSync(fontsDir).forEach(function(file) {
            grunt.log.writeln('Copying ' + fontsDir + file + ' to ' + publicDir + file);
            grunt.file.copy(fontsDir + file,  publicDir + file);
        });
    });

    grunt.registerTask('page', 'generate index.html', function() {
        var _ = require('lodash'),
            src = grunt.file.read('cli/index.us'),
            res = _(src).template(grunt.config.get());

        grunt.file.write('public/index.html', res);
    });

    grunt.registerTask('default', []);//???
    grunt.registerTask('run', ['jshint', 'page', 'fonts',
        'ngtemplates', 'concat_sourcemap', 'express:dev', 'watch']);

    //TODO
    grunt.registerTask('build', ['ngmin']);
};

module.exports = function(grunt) {

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
            }
        }

    });

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-concat-sourcemap');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('server', function() {
        grunt.log.writeln('Starting server...');

        var spawn = require('child_process').spawn,
            done = this.async(),
            server;

        server = spawn('node', ['server/index.js']);

        server.stdout.on('data', function(data) {
            grunt.log.write(data);
        });

        server.stderr.on('data', function(data) {
            grunt.log.write(data);
        });

        server.on('close', function() {
            done();
        });

        done();//works fine with watch task
    });

    grunt.registerTask('page', 'generate index.html', function() {
        var _ = require('lodash'),
            src = grunt.file.read('cli/index.us'),
            res = _(src).template(grunt.config.get());

        grunt.file.write('public/index.html', res);
    });

    grunt.registerTask('default', []);//???
    grunt.registerTask('run', ['jshint', 'page',
        'ngtemplates', 'concat_sourcemap', 'server', 'watch']);

    //TODO
    grunt.registerTask('build', ['ngmin']);

};

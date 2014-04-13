module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat_sourcemap: {
            options: {
                sourcesContent: true
            },
            js: {
                files: {
                    'public/js/app.js': [
                        'cli/bower_components/jquery/dist/jquery.js',
                        'cli/bower_components/angular/angular.js'
                    ]
                }
            },
            css: {
                files: {
                    'public/css/app.css': [
                        'cli/bower_components/fullcalendar/fullcalendar.css'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-concat-sourcemap');

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
    });

    grunt.registerTask('page', 'generate index.html', function() {
        var _ = require('lodash'),
            src = grunt.file.read('cli/index.us'),
            res = _(src).template(grunt.config.get());

        grunt.file.write('public/index.html', res);
    });


    //common: ["jshint", "handlebars", "jst", "concat_sourcemap", "copy:dev", "images:dev", "webfonts:dev", "pages:dev"]

    grunt.registerTask('default', []);//???
    grunt.registerTask('run', ['page', 'concat_sourcemap', 'server']); //TODO add tasks to build client
};

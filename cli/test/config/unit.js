module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath : '../..',

        // list of files / patterns to load in the browser
        files : [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/jquery-ui/ui/jquery-ui.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/fullcalendar/fullcalendar.js',
            'bower_components/angular-ui-calendar/src/calendar.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/angular-flash/dist/angular-flash.js',
            'bower_components/angular-resource/angular-resource.js',

            'bower_components/angular-mocks/angular-mocks.js',
            'app/app.js',
            'app/**/*.html',
            'app/**/*.js',
            'test/unit/**/*.spec.js'
        ],

        // use dots reporter, as travis terminal does not support escaping sequences
        // possible values: 'dots' || 'progress'
        reporters : ['progress', 'coverage'],

        // these are default values, just to show available options

        // web server port
        port:  8089,

        // cli runner port
        runnerPort: 9109,

        urlRoot: '/__test/',

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // polling interval in ms (ignored on OS that support inotify)
        autoWatchInterval: 0,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari
        // - PhantomJS
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        frameworks: ['jasmine'],

        preprocessors : {
            'app/**/*.html': 'ng-html2js', // generate js files from html templates
            'app/**/*.js': ['coverage']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/',
            moduleName: 'templates'
        },
    });
};

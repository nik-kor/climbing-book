angular.module('app', ['ngRoute', 'ui.bootstrap', 'calendar',
    'angular-flash.service', 'angular-flash.flash-alert-directive'])

.config(function($routeProvider, flashProvider) {
    $routeProvider.otherwise({redirectTo: '/calendar'});

    flashProvider.errorClassnames.push('alert-danger');
});

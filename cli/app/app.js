angular.module('app', ['ngRoute', 'ui.bootstrap','calendar'])

.config(function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/calendar'});
});

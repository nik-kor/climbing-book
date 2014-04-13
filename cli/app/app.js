angular.module('app', ['ngRoute', 'calendar'])

.config(function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/calendar'});
});

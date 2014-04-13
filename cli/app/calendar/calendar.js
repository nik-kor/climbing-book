angular.module('calendar', ['ngRoute', 'ui.calendar'])

.config(function($routeProvider) {
    $routeProvider.when('/calendar', {
        templateUrl: 'calendar/template.html',
        controller: 'CalendarController'
    });
})

.controller('CalendarController', function($scope) {

    $scope.calendar_config = {
        height: 600,
        editable: true,
        header:{
            left: 'month basicWeek basicDay agendaWeek agendaDay',
            center: 'title',
            right: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
    };

    $scope.eventSources = {};
});

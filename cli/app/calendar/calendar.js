angular.module('calendar', ['ngRoute', 'ui.calendar'])

.config(function($routeProvider) {
    $routeProvider.when('/calendar', {
        templateUrl: 'calendar/calendar.html',
        controller: 'CalendarController'
    });
})

.controller('CalendarController', function($scope, $templateCache) {

    $scope.calendar_config = {
        firstDay: 1,
        weekNumbers: true,
        height: 600,
        editable: true,
        header:{
            left: 'month basicWeek basicDay agendaWeek agendaDay',
            center: 'title',
            right: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        dayRender: function(date, cell) {
            $('.fc-day-content', cell).html($templateCache.get('calendar/day.html'));
            console.log(date, cell);
        },
        dayClick: function(date, allDay, jsEvent, view) {
            //TODO render popup window
            //
            $('#myModal').modal();
            $(this).css('background-color', 'grey');
        }
    };

    $scope.eventSources = {};
});

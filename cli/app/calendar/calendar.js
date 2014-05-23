angular.module('calendar', ['ngRoute', 'ui.calendar',
                            'cb.directives.training-climbings',
                            'resources.trainings', 'cb.directives.training-event',
                            'services.training_modal'])

.config(function($routeProvider) {
    $routeProvider.when('/calendar', {
        templateUrl: 'calendar/calendar.html',
        controller: 'CalendarController',
        resolve: {
            trainings: function(Trainings) {
                return Trainings.all();
            }
        }
    });
})

.controller('CalendarController', function($scope, $templateCache, flash, trainings, $compile, trainingModal) {

    $scope.trainings = trainings;

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
        eventRender: function(event, element) {
            var scope = $scope.$new(true);
            scope.training = event;
            var eventElem = $compile('<training-event training="training" />')(scope);
            element.html(eventElem);
        },
        // eventDrop: $scope.alertOnDrop,
        // eventResize: $scope.alertOnResize,
        dayClick: function(date/*, allDay, jsEvent, view*/) {
            var scope = $scope.$new(true);
            scope.date = date;

            trainingModal.open(scope);
        },
        startParam: 'date'
    };

    $scope.eventSources = [{
        events: $scope.trainings,
        backgroundColor: 'white',
        borderColor: 'white',
        textColor: 'black'
    }];
});

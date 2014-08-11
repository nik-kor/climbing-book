angular.module('calendar', ['ngRoute', 'ui.calendar',
                            'cb.directives.training-climbings',
                            'resources.trainings', 'cb.directives.training-event',
                            'services.training_modal', 'services.event_sources',
                            'services.date'])

.config(function($routeProvider) {
    $routeProvider.when('/calendar', {
        templateUrl: 'calendar/calendar.html',
        controller: 'CalendarController',
        resolve: {
            trainings: function(Trainings, dateService) {
                return Trainings.get(dateService.getMonthId(new Date()));
            }
        }
    });
})

.controller('CalendarController', function($scope, $templateCache, flash, trainings,
    $compile, trainingModal, eventSourcesService, dateService, Trainings
) {

    $scope.calendarConfig = {
        firstDay: 1,
        weekNumbers: true,
        height: 600,
        editable: true,
        header: false,
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

    $scope.eventSources = {
        events: [{date: '2014-08-01'}],
        backgroundColor: 'white',
        borderColor: 'white',
        textColor: 'black',
        monthId: '2014.6'
    };

    eventSourcesService.init($scope.eventSources);

    $scope.monthSelected = Date.now();

    var updateCalendar = function(d) {
        var month = dateService.getMonthId(d);

        if(eventSourcesService.isLoaded(month)) {
            return;
        }

        Trainings.get(month).then(function(data) {
            console.log('loaded for', month, data);
            eventSourcesService.add(data);

            console.log($scope.eventSources);
            $scope.monthSelected = d.getTime();
        });
    };

    $scope.next = function() {
        $scope.myCalendar.fullCalendar('next');
        updateCalendar($scope.myCalendar.fullCalendar('getDate'));
    };

    $scope.prev = function() {
        $scope.myCalendar.fullCalendar('prev');
        updateCalendar($scope.myCalendar.fullCalendar('getDate'));
    };

    $scope.today = function() {
        $scope.myCalendar.fullCalendar('today');
        updateCalendar($scope.myCalendar.fullCalendar('getDate'));
    };

});

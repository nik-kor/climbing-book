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
                return Trainings.load(Trainings.getMonthId(new Date()));
            }
        }
    });
})

.controller('CalendarController', function($scope, $templateCache, flash, trainings,
    $compile, trainingModal, Trainings
) {

    $scope.trainings = trainings;


    $scope.calendar_config = {
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

    $scope.eventSources = [{
        events: $scope.trainings,
        backgroundColor: 'white',
        borderColor: 'white',
        textColor: 'black'
    }];

    $scope.monthSelected = Date.now();

    var updateMonth = function(d) {
        $scope.monthSelected = d.getTime();
    };

    $scope.next = function() {
        $scope.myCalendar.fullCalendar('next');
        var d = $scope.myCalendar.fullCalendar('getDate');

        //TODO

        // Trainings.load(Trainings.getMonthId(d)).then(function() {

        //     $scope.eventSources.events.push(
        //     console.log(Trainings.read(Trainings.getMonthId(d)));

        // });


        updateMonth(d);
    };

    $scope.prev = function() {
        $scope.myCalendar.fullCalendar('prev');

        //TODO
        updateMonth();

    };

    $scope.today = function() {
        $scope.myCalendar.fullCalendar('today');
        //TODO
        updateMonth();

    };

});

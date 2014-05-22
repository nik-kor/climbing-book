angular.module('calendar', ['ngRoute', 'ui.calendar',
                            'cb.directives.training-climbings',
                            'resources.trainings', 'cb.directives.training-event'])

.config(function($routeProvider) {
    $routeProvider.when('/calendar', {
        templateUrl: 'calendar/calendar.html',
        controller: 'CalendarController',
        resolve: {
            trainings: function(trainings) {
                return trainings.all();
            }
        }
    });
})

.controller('CalendarController', function($scope, $templateCache, $modal, flash, trainings, $compile) {

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

            // console.log(event, element);
            var scope = $scope.$new(true);
            scope.training = event;
            var eventElem = $compile('<training-event training="training" />')(scope);
            element.html(eventElem);
        },
        // eventDrop: $scope.alertOnDrop,
        // eventResize: $scope.alertOnResize,
        dayClick: function(/*date, allDay, jsEvent, view*/) {
            var modalInstance = $modal.open({
                template: $templateCache.get('calendar/day_modal.html'),
                controller: 'TrainingPopupController'
            });
            $scope.eventSources[0].events.push({
                title: 'some',
                start: '2014-05-01'
            });
            modalInstance.result.then(
                function (res) {
                    console.log('Got results from modal', res);
                    flash.success = 'Training for ' + res.date + ' saved';
                    //TODO add taining to calendar grid
                },
                function(err) {
                    console.log(err);
                }
            );
            // $(this).css('background-color', 'grey');
        },
        startParam: 'date'
    };

    $scope.eventSources = [{
        events: $scope.trainings,
        backgroundColor: 'white',
        borderColor: 'white',
        textColor: 'black'
    }];
})

.controller('TrainingPopupController', function($scope, $modalInstance, $http, flash) {

    $scope.max_rate = 10;
    $scope.error_container_id = 'error_message';

    $scope.training = {
        rate: 0,
        climbings: []
    };

    // $scope.difficulty = null;

    $scope.climbing = {
        attempts: []
    };

    $scope.hoveringOver = function(value) {
        $scope.percent = 100 * (value / $scope.max_rate);
        $scope.training.rate = value;
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.save = function(training) {
        training.date = Date.now();

        $http.post('/api/trainings', training).then(
            function(res) {
                $modalInstance.close(res.data);
            },
            function(err) {
                flash.to($scope.error_container_id).error = err.data;
                // $modalInstance.dismiss(err);
            }
        );
    };

});

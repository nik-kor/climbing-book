angular.module('calendar', ['ngRoute', 'ui.calendar', 'cb.directives.add_attempt'])

.config(function($routeProvider) {
    $routeProvider.when('/calendar', {
        templateUrl: 'calendar/calendar.html',
        controller: 'CalendarController'
    });
})

.controller('CalendarController', function($scope, $templateCache, $modal, flash) {
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
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        dayRender: function(date, cell) {
            $('.fc-day-content', cell).html($templateCache.get('calendar/day.html'));
            console.log(date, cell);
        },
        dayClick: function(/*date, allDay, jsEvent, view*/) {
            var modalInstance = $modal.open({
                template: $templateCache.get('calendar/day_modal.html'),
                controller: 'TrainingPopupController'
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
        }
    };

    $scope.eventSources = {};
})

.controller('TrainingPopupController', function($scope, $modalInstance, $http, flash) {

    $scope.max_rate = 10;
    $scope.error_container_id = 'error_message';

    $scope.training = {
        rate: 0,
        climbings: []
    };

    // $scope.difficulty = null;

    $scope.difficulties = [
        {name: '5a', weight: 1},
        {name: '5a+', weight: 1.1},
        {name: '5a+/5b', weight: 1.2},
        {name: '5b', weight: 1.3},
        {name: '5b+', weight: 1.4},
        {name: '5c', weight: 1.5},
        {name: '6a', weight: 1.6},
        {name: '6b', weight: 1.7},
        {name: '6c', weight: 1.8}
    ];


    $scope.climbing = {
        attemptes: []
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

angular.module('calendar', ['ngRoute', 'ui.calendar'])

.config(function($routeProvider) {
    $routeProvider.when('/calendar', {
        templateUrl: 'calendar/calendar.html',
        controller: 'CalendarController'
    });
})

.controller('CalendarController', function($scope, $templateCache, $modal) {

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
                    //TODO add taining to calendar grid
                }
            );
            // $(this).css('background-color', 'grey');
        }
    };

    $scope.eventSources = {};
})

.controller('TrainingPopupController', function($scope, $modalInstance, $http) {

    $scope.max_rate = 10;

    $scope.training = {
        rate: 0
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
                console.error(err);
            }
        );
    };

});

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
                function () {
                    //do smth
                }
            );
            // $(this).css('background-color', 'grey');
        }
    };

    $scope.eventSources = {};
})
.controller('TrainingPopupController', function($scope, $modalInstance) {

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

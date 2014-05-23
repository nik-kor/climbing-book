angular.module('services.training_modal', [])

.factory('trainingModal', function($modal, $templateCache, flash) {
    return {
        open: function(scope) {
            var modalInstance = $modal.open({
                template: $templateCache.get('calendar/day_modal.html'),
                controller: 'TrainingPopupController',
                scope: scope
            });

            modalInstance.result.then(
                function (res) {
                    console.log('Got results from modal', res);
                    flash.success = 'Training for ' + res.date + ' saved';
                },
                function(err) {
                    flash.error = err;
                }
            );

            return modalInstance;
        }
    };
})

.controller('TrainingPopupController', function($scope, $modalInstance, $http, flash, Trainings) {

    $scope.max_rate = 10;
    $scope.error_container_id = 'error_message';

    if(!('training' in $scope)) {
        $scope.training = {
            rate: 0,
            climbings: []
        };

        $scope.training.date = $scope.date.getTime();
    }

    $scope.hoveringOver = function(value) {
        $scope.percent = 100 * (value / $scope.max_rate);
        $scope.training.rate = value;
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.save = function(training) {
        Trainings.save(training).then(
            function(res) {
                $modalInstance.close(res.data);
            },
            function(err) {
                flash.to($scope.error_container_id).error = err.data;
            }
        );
    };

});

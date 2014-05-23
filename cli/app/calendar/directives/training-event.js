angular.module('cb.directives.training-event', [])

.directive('trainingEvent', function(trainingModal, Trainings) {

    return {
        restrict: 'E',
        scope: {
            training: '='
        },

        templateUrl: 'calendar/directives/training-event.html',

        link: function(scope) {

            scope.delete = function(training) {
                Trainings.delete(training);
            };

            scope.edit = function() {
                trainingModal.open(scope);
            };
        }
    };
});

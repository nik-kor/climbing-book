angular.module('cb.directives.training-event', [])

.directive('trainingEvent', function() {

    return {
        restrict: 'E',
        scope: {
            training: '='
        },

        templateUrl: 'calendar/directives/training-event.html',

        link: function(scope, element) {

            console.log(scope, element);

            scope.delete = function(training) {
                console.log('DELETE /api/trainings/%s', training._id);
            };

            scope.edit = function(training) {
                //TODO open modal window
                console.log('PUT /api/trainings/%s', training._id);
            };
        }

    };


});

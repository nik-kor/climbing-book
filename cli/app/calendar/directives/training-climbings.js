angular.module('cb.directives.training-climbings', ['cb.directives.climbing-attempts'])

.directive('trainingClimbings', function() {

    return {

        restrict: 'E',

        scope: {
            'climbings': '='
        },

        templateUrl: 'calendar/directives/training-climbings.html',

        link: function(scope) {

            var clearNewClimbing = function() {
                scope.new_climbing = {
                    belay: false,
                    note: '',
                    attempts: []
                };
            };

            clearNewClimbing();

            scope.add = function(climbing) {
                if(!climbing.belay) {
                    //TODO add warning
                    return;
                }
                scope.climbings.push(climbing);
                clearNewClimbing();
            };

            scope.remove = function(climbing) {
                scope.climbings.splice(scope.climbings.indexOf(climbing), 1);
            };

            scope.edit = function(climbing) {
                climbing.is_editable = true;
            };

            scope.isEditable = function(climbing) {
                return climbing.is_editable;
            };

            scope.edited = function(climbing) {
                climbing.is_editable = false;
            };
        }

    };
})

.directive('trainingClimbing', function() {

    return {
        restrict: 'E',

        templateUrl: 'calendar/directives/training-climbing.html',

        scope: {
            climbing: '='
        },

        link: function() {

        }
    };
});

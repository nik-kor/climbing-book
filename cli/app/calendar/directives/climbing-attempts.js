angular.module('cb.directives.climbing-attempts', [])

/**
 * Dev notes:
 * -----------
 * Elements:
 *  - one add button. Adds new attempt to scope.climbing attempts collection
 *  - one element for creating new Attempt
 *  - collection of already added attempts. With possibility to
 *   - delete
 *   - edit fields
 *
 * Look at http://todomvc.com/architecture-examples/angularjs/#/active for examples
 */
.directive('climbingAttempts', function() {

    return {
        restrict: 'EA',

        scope: {
            attempts: '='
        },

        templateUrl: 'calendar/directives/climbing-attempts.html',

        link: function(scope/*, element*/) {

            scope.difficulties = ['5a', '5a+', '5a+/5b', '5b', '5b+', '5c', '6a', '6b', '6c'];

            var flashNewAttempt = function() {
                scope.new_attempt = {
                    difficulty: '',
                    plus_down: false
                };
            };

            flashNewAttempt();

            scope.addAttempt = function(new_attempt) {
                if(new_attempt.difficulty === '') {
                    //TODO - show warning
                    return;
                }

                if(typeof new_attempt.plus_down === 'undefined') {
                    new_attempt.plus_down = false;
                }

                scope.attempts.push(new_attempt);
                flashNewAttempt();
            };

            scope.removeAttempt = function(attempt) {
                scope.attempts.splice(scope.attempts.indexOf(attempt), 1);
            };
        }
    };
});

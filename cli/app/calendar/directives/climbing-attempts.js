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

            scope.difficulties = [
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

            var flashNewAttempt = function() {
                scope.new_attempt = {
                    difficulty: '',
                    plus_down: false
                };
            };

            flashNewAttempt();

            scope.addAttempt = function() {
                //TODO - add validation
                // if(scope.new_attempt.difficulty === '') {
                //     return;
                // }

                scope.attempts.push(angular.copy(scope.new_attempt));
                flashNewAttempt();
            };

            scope.removeAttempt = function(attempt) {
                scope.attempts.splice(scope.attempts.indexOf(attempt), 1);
            };
        }
    };
});

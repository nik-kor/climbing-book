angular.module('cb.directives.climbing-attempts', [])

.directive('climbingAttempts', function() {

    return {
        restrict: 'E',

        scope: {
            attempts: '='
        },

        templateUrl: 'calendar/directives/climbing-attempts.html',

        link: function(scope/*, element*/) {

            scope.difficulties = ['5a', '5a+', '5a+/5b', '5b', '5b+', '5c', '6a', '6b', '6c'];

            var clearNewAttempt = function() {
                scope.new_attempt = {
                    difficulty: '',
                    plus_down: false
                };
            };

            clearNewAttempt();

            scope.addAttempt = function(new_attempt) {
                if(new_attempt.difficulty === '') {
                    //TODO - show warning
                    return;
                }

                if(typeof new_attempt.plus_down === 'undefined') {
                    new_attempt.plus_down = false;
                }

                scope.attempts.push(new_attempt);
                clearNewAttempt();
            };

            scope.removeAttempt = function(attempt) {
                scope.attempts.splice(scope.attempts.indexOf(attempt), 1);
            };
        }
    };
});

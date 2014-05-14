angular.module('cb.directives.attempts', [])

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
.directive('attempts', function($templateCache, $compile) {

    return {
        restrict: 'EA',

        scope: {
            climbing: '='
        },

        templateUrl: 'calendar/directives/attempts.html',

        link: function(scope, element, attrs) {
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

            //TODO
            element.find('.add-button').click(function(e) {
                e.stopPropagation();

                scope.attempt = {
                    difficulty: '',
                    plus_down: false
                };

                scope.climbing.push(scope.attempt);

                var newAttempt = $compile($templateCache.get('calendar/directives/attempt.html'))(scope);

                newAttempt.appendTo(element.find('ul')).find('.remove-button').click(function(e) {
                    e.stopPropagation();

                    angular.element(e.currentTarget).parents('li').remove();
                });
            });
        }
    };
});

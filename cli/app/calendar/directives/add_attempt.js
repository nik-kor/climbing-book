angular.module('cb.directives.add_attempt', [])

.directive('addAttempt', function($templateCache, $compile) {

    return {
        restrict: 'A',

        link: function(scope, element, attrs) {
            var difficulties = [
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


            element.click(function(e) {
                e.stopPropagation();
                scope.difficulties = angular.copy(difficulties);
                $(attrs.addAttempt).append(
                    $compile($templateCache.get('calendar/directives/attempt.html'))(scope)
                );
            });
        }
    };
});

angular.module('cb.directives.add_attempt', [])

.directive('addAttempt', function() {

    return {
        restrict: 'A',

        link: function(scope, element, attrs) {

            element.click(function(e) {
                e.stopPropagation();

                console.log('add control for new attepmp' + ' ' + attrs.addAttempt);

                $(attrs.addAttempt).append('<li>');
                console.log($(attrs.addAttempt).html());
            });

            console.log(attrs.addAttempt);

        }
    };



});

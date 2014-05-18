describe('cb.directives.climbing-attempts', function() {

    var $scope, element,
        fixtures = {
            attempts: [
                {difficulty: "5a", plus_down: false},
                {difficulty: "6a", plus_down: true}
            ]
        };

    beforeEach(module('templates'));
    beforeEach(module('cb.directives.climbing-attempts'));
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope;
        $scope.climbing = { attempts: []};
        element = $compile('<climbing-attempts attempts="climbing.attempts"/>')($scope);
        $scope.$digest();
    }));

    var addAttempt = function(attempt) {
        element.isolateScope().addAttempt(attempt);
        $scope.$digest();
    };

    var removeAttempt = function(attempt) {
        element.isolateScope().removeAttempt(attempt);
        $scope.$digest();
    };

    it('should add element to ul on button click', function() {
        expect(element.find('ul li.added').length).toBe(0);
        addAttempt(fixtures.attempts[0]);
        expect(element.find('ul li.added').length).toBe(1);
        expect($scope.climbing.attempts.length).toBe(1);
    });

    it('should remove item on remove button click', function() {
        addAttempt(fixtures.attempts[0]);
        addAttempt(fixtures.attempts[1]);

        removeAttempt(fixtures.attempts[0]);
        expect(element.find('ul li.added').length).toBe(1);
        expect($scope.climbing.attempts.length).toBe(1);

        removeAttempt(fixtures.attempts[1]);
        expect(element.find('ul li.added').length).toBe(0);
        expect($scope.climbing.attempts.length).toBe(0);
    });

    it('should not add attempt with empty difficulty', function() {
        expect($scope.climbing.attempts.length).toBe(0);
        addAttempt({difficulty: ''});
        expect($scope.climbing.attempts.length).toBe(0);
        addAttempt({difficulty: '123'});
        expect($scope.climbing.attempts.length).toBe(1);
        expect($scope.climbing.attempts[0].plus_down).toBe(false);
    });
});

describe('cb.directives.training-climbings', function() {

    var $scope, element,
        fixtures = {
            climbings: [
                {
                    belay: 'top-roping',
                    attempts: [],
                    note: 'some'
                }
            ]
        };

    beforeEach(module('templates'));
    beforeEach(module('cb.directives.training-climbings'));

    var addClimbing = function(climbing) {
        element.isolateScope().add(climbing);
        $scope.$digest();
    };

    var removeClimbing = function(climbing) {
        element.isolateScope().remove(climbing);
        $scope.$digest();
    };

    var editClimbing = function(climbing) {
        element.isolateScope().edit(climbing);
        $scope.$digest();
    };

    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope;
        $scope.climbings = [];
        element = $compile('<training-climbings climbings="climbings" />')($scope);
        $scope.$digest();
    }));

    it('should add new climbing', function() {
        addClimbing(fixtures.climbings[0]);
        expect(element.find('li.added').length).toBe(1);
        expect($scope.climbings.length).toBe(1);
    });

    it('should remove climbing', function() {
        addClimbing(fixtures.climbings[0]);
        removeClimbing(fixtures.climbings[0]);
        expect(element.find('li.added').length).toBe(0);
        expect($scope.climbings.length).toBe(0);
    });

    it('should show climging editable content', function() {
        addClimbing(fixtures.climbings[0])
        editClimbing($scope.climbings[0]);

        expect(element.isolateScope().isEditable($scope.climbings[0])).toBeTruthy();
        element.isolateScope().edited($scope.climbings[0]);
        expect(element.isolateScope().isEditable($scope.climbings[0])).toBeFalsy();
    });
});

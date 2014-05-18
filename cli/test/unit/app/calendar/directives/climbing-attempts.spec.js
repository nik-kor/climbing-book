describe('cb.directives.climbing-attempts', function() {

    var $scope, element,
        fixtures = {};

    beforeEach(module('templates'));
    beforeEach(module('cb.directives.climbing-attempts'));
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope;
        $scope.climbing = { attempts: []};
        element = $compile('<climbing-attempts attempts="climbing.attempts"/>')($scope);
        $scope.$digest();
    }));


    it('should add element to ul on button click', function() {
        element.find('.add-button').click();
        element.find('.add-button').click();

        expect(element.find('ul li.added').length).toBe(2);
        expect($scope.climbing.attempts.length).toBe(2);
    });

    it('should remove item on remove button click', function() {
        element.find('.add-button').click();
        element.find('.add-button').click();

        element.find('.remove-button:first').click();
        expect(element.find('ul li.added').length).toBe(1);
        element.find('.remove-button:first').click();
        expect(element.find('ul li.added').length).toBe(0);
    });

    it('should choose difficulty', function() {
        //TODO
    });
});

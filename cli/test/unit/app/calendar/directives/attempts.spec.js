describe('climbing-book.add_attempt directive', function() {

    var $scope, element,
        fixtures = {};

    beforeEach(module('templates'));
    beforeEach(module('cb.directives.attempts'));
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope;
        $scope.climbing = { attempts: []};
        element = $compile('<attempts climbing="climbing.attempts"/>')($scope);
        $scope.$digest();
    }));


    it('should contain ul and button', function() {
        expect(element.find('ul').length).toBe(1);
        expect(element.find('button').length).toBe(1);
    });

    it('should add element to ul on button click', function() {
        element.find('.add-button').click();
        element.find('.add-button').click();

        expect(element.find('ul li').length).toBe(2);

        console.log($scope.climbing);
    });

    it('should remove item on remove button click', function() {
        element.find('.add-button').click();
        element.find('.add-button').click();

        element.find('.remove-button:first').click();
        expect(element.find('ul li').length).toBe(1);
        element.find('.remove-button:first').click();
        expect(element.find('ul li').length).toBe(0);
    });
});

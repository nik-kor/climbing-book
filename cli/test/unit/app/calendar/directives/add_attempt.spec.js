describe('climbing-book.add_attempt directive', function() {

    var $scope, element, ul,
        fixtures = {
            ulClassName: "list-to-add-attempt"
        };

    beforeEach(module('templates'));
    beforeEach(module('cb.directives.add_attempt'));
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope;
        ul = document.createElement('ul');
        ul.className = fixtures.ulClassName;
        document.body.appendChild(ul);
        element = $compile('<button add-attempt="ul.' + fixtures.ulClassName + '">Add attempt</button>')($scope);
        $scope.$digest();
    }));


    it('should be ok', function() {
        element.click();
        expect(angular.element(ul).children().length).toBe(1);
        element.click();
        expect(angular.element(ul).children().length).toBe(2);
    });

});

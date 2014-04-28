describe('climbing-book.add_attempt directive', function() {

    var $scope, element;

    beforeEach(module('cb.directives.add_attempt'));
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope;
        var html = '<ul class="list-to-add-attempt"><li>hi there!</li></ul>';
        angular.element(document.body).append(html);
        element = $compile('<button add-attempt="ul.list-to-add-attempt">Add attempt</button>')($scope);
        $scope.$digest();
    }));


    it('should be ok', function() {
        element.click();

    });

});

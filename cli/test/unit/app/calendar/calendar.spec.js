describe('Calendar', function() {

    beforeEach(module('calendar'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('templates'));

    describe('CalendarController', function() {

        var locals;

        function createLocals() {
            return {
                $scope: {},
                flash: {}
            };
        }

        function runController(locals) {
            inject(function($controller) {
                $controller('CalendarController', locals);
            });
        }

        beforeEach(inject(function(_$modal_, _$templateCache_) {
            locals = createLocals();
            locals.$modal = _$modal_;
            spyOn(locals.$modal, 'open').andCallThrough();
            locals.$templateCache = _$templateCache_;
            runController(locals);
        }));


        it('Open modal on dayClick()', function() {
            expect(locals.$scope.calendar_config).toBeDefined();
            locals.$scope.calendar_config.dayClick();
            expect(locals.$modal.open).toHaveBeenCalled();
        });

    });

});

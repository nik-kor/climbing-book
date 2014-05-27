ddescribe('Trainings resource', function() {

    var JANUARY_TR = '2014.1',
        MAY_TR = '2014.5';

    var fixtures = {};
    fixtures.attempt = {
        difficulty: '7c',
        plus_down: true
    };
    fixtures.climbings = [
        {
            belay: 'top-roping',
            attempts: [fixtures.attempt, fixtures.attempt],
            note: 'some'
        },
        {
            belay: 'lead-climbing',
            attempts: [fixtures.attempt, fixtures.attempt],
            note: 'some'
        }
    ];
    fixtures.training = {
        warm_up: 'warm up',
        climbings: [fixtures.climbings],
        stretching: false,
        desc: 'desc',
        rate: 8,
        date: '2014.1',
        exercises: 'excercises'
    };
    fixtures.trainings = {
        '2014.1': [fixtures.training],
        '2014.5': [{date: '2014.5', warm_up: 'some'}]
    };

    var Trainings, $httpBackend, $q, $rootScope;

    beforeEach(module('resources.trainings'));

    beforeEach(inject(function(_Trainings_, _$httpBackend_, _$q_, _$rootScope_) {
        Trainings = _Trainings_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $rootScope = _$rootScope_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send requests for trainings filtered by month', function() {
        var p;

        //january trainings
        $httpBackend.expect('GET', Trainings.APIRootPath + '?month=' + JANUARY_TR)
            .respond(200, fixtures.trainings[JANUARY_TR]);

        p = Trainings.all(JANUARY_TR);

        var resolved = jasmine.createSpy('resolved');
        p.then(resolved);
        $httpBackend.flush();

        expect(resolved).toHaveBeenCalled();
        expect(resolved.calls.length).toBe(1);

        Trainings.all(JANUARY_TR).then(resolved);
        $rootScope.$apply();
        expect(resolved.calls.length).toBe(2);

        //may trainings
        $httpBackend.expect('GET', Trainings.APIRootPath + '?month=' + MAY_TR)
            .respond(200, fixtures.trainings[MAY_TR]);

        p = Trainings.all(MAY_TR)

        var resolved = jasmine.createSpy('resolved');
        p.then(resolved);

        $httpBackend.flush();
        expect(resolved).toHaveBeenCalled();
    });

    it('should create Date objects', function() {
        var p;

        $httpBackend.expect('GET', Trainings.APIRootPath + '?month=' + JANUARY_TR)
            .respond(200, fixtures.trainings[JANUARY_TR]);

        p = Trainings.all(JANUARY_TR);

        var trs;
        p.then(function(res) {trs = res;});

        $httpBackend.flush();
        expect(trs[0].date instanceof Date).toBeTruthy();
    });


    it('should save a new training', function() {
        $httpBackend.expect('POST', Trainings.APIRootPath)
            .respond(200, '');

        Trainings.save(fixtures.training);

        $httpBackend.flush();

    });

});

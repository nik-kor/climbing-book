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
        date: '2014.1.21',
        exercises: 'excercises'
    };

    fixtures.trainings = {};
    fixtures.trainings[JANUARY_TR] = [fixtures.training];
    fixtures.trainings[MAY_TR] = [{date: MAY_TR + '.12', warm_up: 'some'}];

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

    it('should fullfill promises and then training available', function() {
        var p;

        //january trainings
        $httpBackend.expect('GET', Trainings.APIRootPath + '?month=' + JANUARY_TR)
            .respond(200, fixtures.trainings[JANUARY_TR]);

        p = Trainings.load(JANUARY_TR);

        var resolved = jasmine.createSpy('resolved');
        p.then(resolved);
        $httpBackend.flush();

        expect(Trainings.read(JANUARY_TR).length).toBe(fixtures.trainings[JANUARY_TR].length);

        expect(resolved).toHaveBeenCalled();
        expect(resolved.calls.length).toBe(1);

        Trainings.load(JANUARY_TR).then(resolved);
        $rootScope.$apply();
        expect(resolved.calls.length).toBe(2);

        //may trainings
        $httpBackend.expect('GET', Trainings.APIRootPath + '?month=' + MAY_TR)
            .respond(200, fixtures.trainings[MAY_TR]);

        p = Trainings.load(MAY_TR);

        var resolved = jasmine.createSpy('resolved');
        p.then(resolved);

        $httpBackend.flush();
        expect(resolved).toHaveBeenCalled();

        expect(Trainings.read(MAY_TR).length).toBe(fixtures.trainings[MAY_TR].length);
    });

    it('should create Date objects', function() {
        var p;

        $httpBackend.expect('GET', Trainings.APIRootPath + '?month=' + JANUARY_TR)
            .respond(200, fixtures.trainings[JANUARY_TR]);

        p = Trainings.load(JANUARY_TR);

        $httpBackend.flush();
        expect(Trainings.read(JANUARY_TR)[0].date instanceof Date).toBeTruthy();
    });


    it('should save a new training', function() {
        $httpBackend.expect('POST', Trainings.APIRootPath)
            .respond(200, '{"_id": "asfdsafddsf132", "date": "2013.01.21" }');

        $httpBackend.expect('GET', Trainings.APIRootPath + '?month=2013.1')
            .respond(200, '[]');

        Trainings.save(fixtures.training);

        $httpBackend.flush();
    });


    it('should delete training from collection', function() {
        fixtures.trainings[JANUARY_TR][0]._id = 'asdfsad12312sdf';
        $httpBackend.expect('GET', Trainings.APIRootPath + '?month=' + JANUARY_TR)
            .respond(200, fixtures.trainings[JANUARY_TR]);

        Trainings.load(JANUARY_TR);
        $httpBackend.flush();
        expect(Trainings.read(JANUARY_TR)[0]._id).toBe(fixtures.trainings[JANUARY_TR][0]._id);

        $httpBackend.expect('DELETE', Trainings.APIRootPath + '/' + fixtures.trainings[JANUARY_TR][0]._id)
            .respond(200, '');

        Trainings.delete(Trainings.read(JANUARY_TR)[0]);
        $httpBackend.flush();
        expect(Trainings.read(JANUARY_TR).length).toBe(0);
    });
});

ddescribe('Trainings resource', function() {

    var JANUARY_TR = '2014.1';
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
    fixtures.trainings = {
        '2014.1': [
            {
                warm_up: 'warm up',
                climbings: [fixtures.climbings],
                stretching: false,
                desc: 'desc',
                rate: 8,
                date: '2014.01.11',
                exercises: 'excercises'
            }
        ]
    };

    var Trainings, $httpBackend;

    beforeEach(module('resources.trainings'));

    beforeEach(inject(function(_Trainings_, _$httpBackend_) {
        Trainings = _Trainings_;
        $httpBackend = _$httpBackend_;
    }));


    it('should send request for trainings filtered by month', function() {
        $httpBackend.expect('GET', '/api/trainings?month=' + JANUARY_TR)
            .respond(200, fixtures.trainings[JANUARY_TR]);

        var p = Trainings.all(JANUARY_TR);

        var resolved = false;
        p.then(function(res) { resolved = true;});
        console.log($httpBackend);

        $httpBackend.flush();

        expect(resolved).toBeTruthy();
    });
});

angular.module('resources.trainings', [])

.factory('Trainings', function($http, $q) {


    var trainings = {},
        _defer;

    trainings.all = function() {
        if(_defer) {
            return _defer.promise;
        }

        _defer = $q.defer();

        $http.get('/api/trainings')
        .success(function(data) {
            data.forEach(function(tr) {
                tr.date = new Date(tr.date);
            });

            _defer.resolve(data);
        })
        .error(function(err) {
            _defer.reject(err);
        });

        return _defer.promise;
    };

    var normilizeTraining = function(source) {
        return {
            warm_up: source.warm_up,
            climbings: source.climbings,
            stretching: source.stretching,
            desc: source.desc,
            rate: source.rate,
            date: typeof source.date === 'object' ?  source.date.getTime() : source.date,
            exercises: source.exercises
        };
    };

    trainings.save = function(training) {
        return training._id
            ? $http.put('/api/trainings/' + training._id, normilizeTraining(training))
            : $http.post('/api/trainings', normilizeTraining(training));
    };


    trainings.delete = function(training) {
        return $http.delete('/api/trainings/' + training._id);
    };


    return trainings;
});

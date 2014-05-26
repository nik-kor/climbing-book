angular.module('resources.trainings', [])

.factory('Trainings', function($http, $q) {


    var trainings = {};


    /**
     * month -> promise, e.g.
     *      '2014.1' -> {Promise}
     *
     */
    var _loaded = {};

    /**
     * Get trainings by month
     *
     * @param {String} month - 'YYYY.MM'
     * @return {Promise}
     */
    trainings.all = function(month) {
        if(typeof _loaded[month] !== 'undefined') {
            return _loaded[month];
        }

        var _defer = $q.defer();

        _loaded[month] = _defer.promise;

        $http.get('/api/trainings?month=' + month)
        .success(function(data) {
            data.forEach(function(tr) {
                tr.date = new Date(tr.date);
            });

            _defer.resolve(data);
        })
        .error(function(err) {
            _defer.reject(err);
        });

        return _loaded[month];
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

        //TODO - add new training to collection
    };


    trainings.delete = function(training) {
        var p = $http.delete('/api/trainings/' + training._id);

        p.then(function() {
            //TODO - delete training from collection

        });

        return p;
    };


    return trainings;
});

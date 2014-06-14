angular.module('resources.trainings', [])

.factory('Trainings', function($http, $q) {


    var trainings = {};

    trainings.APIRootPath = '/api/trainings';


    /**
     * Get month id, e.g
     *  - 2014.1 - january 2014
     *  - 2013.12 - december 2014
     *
     * @param {Object} date - instanceof Date
     * @return {String} - in format YYYY.MM?
     */
    trainings.getMonthId = function(date) {
        if(date instanceof Date) {
            return date.getFullYear() + '.' + (date.getMonth() + 1);
        }

        throw new Error('Input parameter date is not an instance of Date');
    };

    /**
     * @var {Object}
     *
     * month -> promise, e.g.
     *     '2014.1' -> {Promise}
     */
    var _loaded = {};

    /**
     * @var {Object}
     *
     * month -> collection of trainings, e.g
     *      '2014.1' -> [{_id: 1}, {_id: 2}]
     */
    var _data = {};

    /**
     * Get trainings by month
     *
     * @param {String} month - 'YYYY.MM'
     * @return {Promise}
     */
    trainings.load = function(month) {
        if(typeof _loaded[month] !== 'undefined') {
            return _loaded[month];
        }

        var _defer = $q.defer();

        _loaded[month] = _defer.promise;

        $http.get(trainings.APIRootPath + '?month=' + month)
            .success(function(data) {
                data.forEach(function(tr) {
                    tr.date = new Date(tr.date);
                });

                _data[month] = data;

                _defer.resolve(true);
            })
            .error(function(err) {
                _defer.reject(err);
            });

        return _loaded[month];
    };

    /**
     * Read directly from _data
     */
    trainings.read = function(month) {
        return _data[month];
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
        var p = training._id
            ? $http.put(trainings.APIRootPath + '/' + training._id, normilizeTraining(training))
            : $http.post(trainings.APIRootPath, normilizeTraining(training));

        if(!training._id) {
            p.then(function(res) {
                var tr = res.data;
                tr.date = new Date(tr.date);

                trainings.load(trainings.getMonthId(tr.date)).then(function() {
                    _data[trainings.getMonthId(tr.date)].push(tr);
                });
            });
        }
    };


    trainings.delete = function(training) {
        var month = trainings.getMonthId(training.date),
            p = $http.delete(trainings.APIRootPath + '/' + training._id);

        p.then(function() {
            _data[month] = _data[month].filter(function(t) {
                return t._id !== training._id;
            });
        });

        return p;
    };


    return trainings;
});

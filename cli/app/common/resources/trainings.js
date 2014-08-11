angular.module('resources.trainings', ['services.date'])

.factory('Trainings', function($http, $q, dateService) {


    var trainings = {};

    trainings.APIRootPath = '/api/trainings';

    /**
     * Get trainings by month
     *
     * @param {String} month - 'YYYY.MM'
     * @return {Promise}
     */
    trainings.get = function(month) {

        var _defer = $q.defer();

        $http.get(trainings.APIRootPath + '?month=' + month)
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
        var p = training._id
            ? $http.put(trainings.APIRootPath + '/' + training._id, normilizeTraining(training))
            : $http.post(trainings.APIRootPath, normilizeTraining(training));

        if(!training._id) {
            p.then(function(res) {
                var tr = res.data;
                tr.date = new Date(tr.date);

                //TODO
                // trainings.load(dateService.getMonthId(tr.date)).then(function() {
                //     _data[dateService.getMonthId(tr.date)].push(tr); });
            });
        }
    };


    trainings.delete = function(training) {
        var month = dateService.getMonthId(training.date),
            p = $http.delete(trainings.APIRootPath + '/' + training._id);

        console.log(month);

        p.then(function() {
            // _data[month] = _data[month].filter(function(t) {
            //     return t._id !== training._id;
            // });
        });

        return p;
    };


    return trainings;
});

angular.module('resources.trainings', [])

.factory('trainings', function($http, $q) {

    var _trainings = [],
        _defer;

    var trainings = {};


    trainings.getByDate = function(date) {
        return _trainings.filter(function(tr) {
            return tr.date.getFullYear() === date.getFullYear()
                && tr.date.getMonth() === date.getMonth()
                && tr.date.getDate() === date.getDate();
        });
    };

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
            _trainings = data;
            _defer.resolve(trainings);
        })
        .error(function(err) {
            _defer.reject(err);
        });

        return _defer.promise;
    };


    return trainings;
});

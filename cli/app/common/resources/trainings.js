angular.module('resources.trainings', [])

.factory('trainings', function($http, $q) {


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


    return trainings;
});

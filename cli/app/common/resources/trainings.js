angular.module('resources.trainings', ['ngResource'])

.factory('Trainings', function($resource) {

    var Trainings = $resource('/api/trainings/:id', {});

    Trainings.getByDate = function(date) {

    };

    return Trainings;
});

angular.module('services.event_sources', [])

.factory('eventSourcesService', function() {

    var _eventSource;

    return {
        init: function(eventSource) {
            _eventSource = eventSource;
        },

        add: function(events) {
            events.forEach(function(e) {
                _eventSource.events.push(e);
            });
        },

        //TODO
        isLoaded: function(month) {
            console.log('isLoaded', month);
            return false;
        }
    };
});

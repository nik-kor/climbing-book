angular.module('services.date', [])

.factory('dateService', function() {

    return {
        /**
         * Get month id, e.g
         *  - 2014.1 - january 2014
         *  - 2013.12 - december 2014
         *
         * @param {Object} date - instanceof Date
         * @return {String} - in format YYYY.MM?
         */
        getMonthId: function(date) {
            if(date instanceof Date) {
                return date.getFullYear() + '.' + (date.getMonth() + 1);
            }

            throw new Error('Input parameter date is not an instance of Date');
        }
    };
});

var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/climbing-book');



var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CLIBMING_TYPE = {
    TOP_BELAY: 'top',
    BOTTOM_BELAY: 'bottom',
    BOULDERING: 'bouldering'
};


var Climbing = new Schema({
    type: String, //CLIMBING_TYPE
    grade: String, //e.g. 5a, 7c, 8a+, etc.
    plus_down: Boolean,
    series: ObjectId, //series id
    note: String
});


var Training = new Schema({
    warm_up: String,
    climbings: [Climbing],
    stretching: Boolean,
    desc: String,
    mark: Number
});


module.exports = db.model('training', Training);

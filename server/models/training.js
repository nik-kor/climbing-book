var mongoose = require('mongoose');


var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CLIBMING_TYPE = {
    TOP_BELAY: 'top',
    BOTTOM_BELAY: 'bottom',
    BOULDERING: 'bouldering'
};


var Climbing = new Schema({
    type: String, //CLIMBING_TYPE
    grade: Number,
    plus_down: Boolean,
    series: ObjectId //series id
});


var Training = new Schema({
    warm_up: String,
    climbings: [Climbing],
    stretching: Boolean,
    desc: String,
    mark: Number
});

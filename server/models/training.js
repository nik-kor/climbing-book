var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/climbing-book');

var Schema = mongoose.Schema;

var Attempt = new Schema({
    grade: {type: String, required: true}, //e.g. 5a, 7c, 8a+, etc.
    plus_down: {type: Boolean, default: false}
});

var Climbing = new Schema({
    type: {type: String, required: true, enum: ['top', 'bottom', 'bouldering'] },
    series: [Attempt],
    note: String
});

var Training = new Schema({
    warm_up: String,
    climbings: [Climbing],
    stretching: Boolean,
    desc: String,
    mark: Number,
    date: {type: Date, required: true}
});


module.exports = db.model('training', Training);

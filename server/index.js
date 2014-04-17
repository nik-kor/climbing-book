var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');



app.use(bodyParser());
app.use(express.static(__dirname + '/../public'));

// mongoose.connect('mongodb://localhost/climbing-book', function(err) {
//     if(err) {
//         console.log(err);
//     }
// });


var Training = require('./models/training');

app.post('/api/training', function(req, res) {
    var training = new Training(req.body);
    training.save(function(err) {
        if(err) {
            res.json(500, err);
        } else {
            res.json(200, training);
        }

    });
});



console.log('Listening on port 3000');

app.listen(3000);

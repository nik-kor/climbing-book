var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');



app.use(bodyParser());
app.use(express.static(__dirname + '/../public'));


var Training = require('./models/training');

//curl -v -X POST -H "Content-Type: application/json" -d '{"warm_up": "some worm uppppp", "desc": "everything seeems ok", "climbings": [{"type": "bottom", "series": [{"grade": "5c", "plus_down": false}, {"grade": "5a", "plus_down": true}]}]}' http://localhost:3000/api/training
//
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

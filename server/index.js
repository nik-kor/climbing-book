var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');



app.use(bodyParser());
app.use(express.static(__dirname + '/../public'));


var Training = require('./models/training');

//curl -v -X POST -H "Content-Type: application/json" -d '{"warm_up": "some worm uppppp", "desc": "everything seeems ok", "climbings": [{"type": "bottom", "series": [{"grade": "5c", "plus_down": false}, {"grade": "5a", "plus_down": true}]}]}' http://localhost:3000/api/training
//
app.post('/api/trainings', function(req, res) {
    var training = new Training(req.body);
    training.save(function(err) {
        if(err) {
            res.json(400, err.message);
        } else {
            res.json(200, training);
        }
    });
});


app.get('/api/trainings/:id', function(req, res) {
    var query = Training.findById(req.params.id);

    query.exec(function(err, results) {
        if(err) {
            res.json(500, err);
        }

        res.json(200, results);
    });
});


app.get('/api/trainings', function(req, res) {
    var query = Training.find({});

    query.exec(function(err, results) {
        if(err) {
            res.json(500, err);
        }

        res.json(200, results);
    });
});

app.put('/api/trainings/:id', function(req, res) {
    Training.findById(req.params.id, function(err, training) {
        if(err) {
            res.json(500, err.toString());
        } else if(!training) {
            res.json(404, {});
        } else {
            training.warm_up = req.body.warm_up;
            training.climbings = req.body.climbings;
            training.stretching = req.body.stretching;
            training.desc = req.body.desc;
            training.rate = req.body.rate;
            training.exercises = req.body.exercises;

            training.save(function(err) {
                if(err) {
                    res.json(500, err.toString());
                } else {
                    res.json(200, training);
                }
            });
        }
    });

});


app.delete('/api/trainings/:id', function(req, res) {
    Training.findByIdAndRemove(req.params.id, function() {
        res.json(200, {});
    });
});


console.log('Listening on port 3000');

app.listen(3000);

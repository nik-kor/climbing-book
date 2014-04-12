var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/../public'));



console.log('listening on port 3000');


app.listen(3000);

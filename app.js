var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var port = process.env.PORT || 3000;
var app = express();

// init db
require('./database/init');

// config
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes/index'));

// start
app.listen(port, function () {
    console.log('server listening at: ' + port);
});

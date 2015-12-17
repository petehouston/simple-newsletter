var mongoose = require('mongoose');
var config = require('../config.json');

mongoose.connect('mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.db);

var db = mongoose.connection;

// has error
db.on('error', console.error.bind(console, 'connection error:'));





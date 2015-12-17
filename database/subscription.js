var mongoose = require('mongoose');

var SubSchema = mongoose.Schema({
    name: String,
    email: String
});

module.exports = mongoose.model('Subscription', SubSchema);
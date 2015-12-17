var express = require('express');
var mailer = require('../mailer/index');
var subscription = require('../database/subscription');
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.post('/api/subsribe', function (req, res) {
    var user = {
        name: req.body.name,
        email: req.body.email
    };

    var sub = new subscription({
        name: user.name,
        email: user.email
    });

    sub.save(function (err, model) {
        if (err) {
            console.log(err);
            return res.json(err);
        }

        console.log('New subscription { ' + user.name + ':' + user.email + ' } has been saved successfully!');
    });

    mailer.send(user, function (err, result) {
        if(err) {
            console.log(err);
            return res.json(err);
        }

        return res.json(result);
    });
});

module.exports = router;
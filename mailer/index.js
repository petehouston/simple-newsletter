var template = require('lodash.template');
var fs = require('fs');
var path = require('path');
var config = require('../config.json');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(config.mandrill.api_key);

var mailer = {};

mailer.send = function (user, cb) {
    var message = {
        "html": template(fs.readFileSync(path.join(__dirname, '..', 'templates', 'email.tpl')))({
            name: user.name,
            email: user.email}),
        "subject": config.email.template.subject,
        "from_email": config.email.template.from_email,
        "from_name": config.email.template.from_name,
        "to": [{
            "email": user.email,
            "name": user.name,
            "type": "to"
        }]
    };

    mandrill_client.messages.send({
        message: message,
        async: true
    }, function (result) {

        cb(null, result);
    }, function (error) {

        cb(error);
    });
};

module.exports = mailer;
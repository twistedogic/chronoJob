var Mailgun = require('mailgun-js');
var fs = require('fs');
var api_key = 'key-3z2nwyjiq240lyqp6sz3t3a852toy9i2';
var domain = 'twistedogic.mailgun.org';
var mailgun = new Mailgun({apiKey: api_key, domain: domain});
var recipient = ['twistedogic@gmail.com'];

var report = new mailgun.Attachment({data: fs.readFileSync('../report/report.csv'), filename: 'report.csv'});
var attch = [report];

var data = {
    from: 'Daily Report <me@twistedogic.mailgun.org>',
    to: recipient,
	subject: 'Daily Report' ,
	text: 'Daily Report',
	attachment: attch
};
mailgun.messages().send(data, function (error, body) {
    console.log(body);
});
var Mailgun = require('mailgun-js');
var fs = require('fs');
var api_key = 'key-3z2nwyjiq240lyqp6sz3t3a852toy9i2';
var domain = 'twistedogic.mailgun.org';
var mailgun = new Mailgun({apiKey: api_key, domain: domain});
var recipient = ['twistedogic@gmail.com','dennisnkh@hotmail.com'];

var buyList = new mailgun.Attachment({data: fs.readFileSync('../report/buyrsi.csv'), filename: 'buyrsi.csv'});
var sellList = new mailgun.Attachment({data: fs.readFileSync('../report/sellrsi.csv'), filename: 'sellrsi.csv'});
var smaBuyList = new mailgun.Attachment({data: fs.readFileSync('../report/buysma.csv'), filename: 'buysma.csv'});
var smaSellList = new mailgun.Attachment({data: fs.readFileSync('../report/sellsma.csv'), filename: 'sellsma.csv'});
var allRSI = new mailgun.Attachment({data: fs.readFileSync('../report/allrsi.csv'), filename: 'allrsi.csv'});
var attch = [buyList,sellList,smaBuyList,smaSellList,allRSI];

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
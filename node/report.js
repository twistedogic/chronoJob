var Mailgun = require('mailgun-js');
var fs = require('fs');
var api_key = 'key-3z2nwyjiq240lyqp6sz3t3a852toy9i2';
var domain = 'twistedogic.mailgun.org';
var mailgun = new Mailgun({apiKey: api_key, domain: domain});
var recipient = ['twistedogic@gmail.com','dennisnkh@hotmail.com','stanley.yk.chan@gmail.com','lampakyin@hotmail.com','sue22h@gmail.com'];
// var recipient = ['jordan.yy.li@pccw.com']
var moment = require("moment");
var time = moment().zone('+0800').format("YYYY-MM-DD HH:mm");
var date = moment().zone('+0800').format("YYYY-MM-DD");
var buyList = new mailgun.Attachment({data: fs.readFileSync('../report/report'+ date +'.csv'), filename: 'report'+ date +'.csv'});
var sellList = new mailgun.Attachment({data: fs.readFileSync('../report/rsiBuy'+ date +'.csv'), filename: 'rsiBuy'+ date +'.csv'});
var smaBuyList = new mailgun.Attachment({data: fs.readFileSync('../report/rsiSell'+ date +'.csv'), filename: 'rsiSell'+ date +'.csv'});
var smaSellList = new mailgun.Attachment({data: fs.readFileSync('../report/bbBuy'+ date +'.csv'), filename: 'bbBuy'+ date +'.csv'});
var report = new mailgun.Attachment({data: fs.readFileSync('../report/bbSell'+ date +'.csv'), filename: 'bbSell'+ date +'.csv'});
var attch = [buyList,sellList,smaBuyList,smaSellList,report];

var data = {
    from: 'Daily Report <me@twistedogic.mailgun.org>',
    to: recipient,
	subject: 'Daily Report',
	text: time,
	attachment: attch
};
mailgun.messages().send(data, function (error, body) {
    console.log(body);
});
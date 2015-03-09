var me = process.argv[2] || process.env.CUSER; // Set this to your own account
var password = process.argv[3] || process.env.PASS;
var cred = {
    account:me,
    password:password
};
var Cloudant = require('cloudant')(cred);
var db = Cloudant.use('companyinfo');
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan = require('morgan');
var request = require('request');
var moment = require('moment');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ 
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.json({limit: '50mb'}));

//logger
app.use(morgan('tiny'));

var port = process.env.OPENSHIFT_INTERNAL_PORT || process.env.OPENSHIFT_NODEJS_PORT || 3001; // set our port
var ip = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

app.get('/', function(req, res) {
    res.json({message:'Hi'})
})
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.get('/api/hist/:stockId', function(req, res) {
    var stockId = req.params.stockId;
    stockId = stockId.split('.')[0];
    request({
        url: 'https://api.investtab.com/api/quote/0' + stockId + ':HK/historical-prices'
    }, function (err, resp, body) {
        if (err) { return cb(err); }
        if (resp.statusCode == 200){
            var data = JSON.parse(body);
            if(data.s == "ok"){
                var o = data.o;
                var h = data.h;
                var l = data.l;
                var c = data.c;
                var t = data.t;
                var v = data.v;
                var symbol = stockId;
                var output = 'Symbol,Date,Open,High,Low,Close,Volume';
                for (var j = 0; j < t.length; j++){
                    output = output + '\n' + symbol + ',' + moment.unix(t[j]).zone('+0800').format("YYYY-MM-DD") + ',' + o[j] + ',' + h[j] + ',' + l[j] + ',' + c[j] + ',' + v[j];
                }
                res.contentType('csv');
                res.send(output);
            } else {
                res.json({message:'fail to download '+ stockId});
            }
        } else {
            res.json({message:'fail to download '+ stockId});
        }
    });
});

app.get('/api/ta/r/:stockId', function(req, res) {
    
    var stockId = req.params.stockId;
    request.post({
        url:'http://twistedogic.ocpu.io/TAA/R/TAA', 
        json: {"id":stockId,"endPoint":"http://api-twistedogic01.rhcloud.com/api/hist/"}
    }, function(err,resp,body){
        if(err){
            res.json({message:'record not found'});
            console.log(err);
        } else {
            var data = body.split('\n');
            var check = body.split('ocpu').length;
            if(check > 1){
                var dataurl = resp.headers.location + 'R/.val/csv';
                console.log(dataurl);
                request(dataurl,function(err,resp,body){
                    if(err){
                        console.log(err);
                        res.json({message:'R error'});
                    } else {
                        var csv = body.split('\n');
                        var header = csv[0].split('coredata.');
                        csv[0] = header.join('');
                        csv = csv.join('\n');
                        res.contentType('csv');
                        res.send(csv);
                    }
                })
            } else {
                res.json({message:'R error'});
            }
        }
    }) 
});

app.get('/api/sector/:sector', function(req, res) {
    var sector = req.params.sector;
    db.get(sector,function(err,resp){
        if(!err){
            var data = resp.data.symbols;
            data = data.join('\n');
            res.contentType('csv');
            res.send(data);
        } else {
            res.json({message:'Not found'});
        }
    })
});

app.get('/api/news/tc/:stockId', function(req, res) {
    res.json({message:'coming soon'});
});
app.get('/api/news/en/:stockId', function(req, res) {
    res.json({message:'coming soon'});
});
app.get('/api/info/:stockId', function(req, res) {
    res.json({message:'coming soon'});
});

// START THE SERVER
// =============================================================================
app.listen(port,ip);
console.log("server listening at " + port);

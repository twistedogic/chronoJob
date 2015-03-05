var moment = require('moment');
var crate = require('cratejs');
var crateIP = process.argv[2] || '10.0.0.125';
var db = new crate({
  host: crateIP,
  port: 4200
});
var request = require('request');
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan = require('morgan');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ 
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.json({limit: '50mb'}));

//logger
app.use(morgan('tiny'));

var port = 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

app.get('/', function(req, res) {
    request('http://' + crateIP + ':4200/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(JSON.parse(body)); // Show the HTML for the Google homepage.
        } else {
            res.send(error);
        }
    });
})
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.get('/api/hist/desc/:stockId', function(req, res) {
    
    var stockId = req.params.stockId;
    var getData = db.Select('stockHist')
        .columns(['symbol', 'date', 'open', 'high', 'low', 'close', 'volume'])
        .where({
            symbol: stockId
        })
        // .limit(1)
        .order('unix', 'desc');
    getData.run(function(err, resp) {
        var csv = resp.cols.join(',');
        if(resp.rows.length > 0){
            for (var i = 0; i < resp.rows.length; i++){
                csv = csv + '\n' + resp.rows[i].join(',');
            }
            res.contentType('csv');
            res.send(csv);
        } else {
            res.json({message:'record not found'});
        }
    });
    
});

app.get('/api/hist/asc/:stockId', function(req, res) {
    
    var stockId = req.params.stockId;
    var getData = db.Select('stockHist')
        .columns(['symbol', 'date', 'open', 'high', 'low', 'close', 'volume'])
        .where({
            symbol: stockId
        })
        // .limit(1)
        .order('unix', 'asc');
    getData.run(function(err, resp) {
        console.log(resp);
        var csv = resp.cols.join(',');
        if(resp.rows.length > 0){
            for (var i = 0; i < resp.rows.length; i++){
                csv = csv + '\n' + resp.rows[i].join(',');
            }
            res.contentType('csv');
            res.send(csv);
        } else {
            res.json({message:'record not found'});
        }
    });
    
});

app.get('/api/ta/py/desc/:stockId', function(req, res) {
    
    var stockId = req.params.stockId;
    var getData = db.Query('SELECT * FROM ta where symbol = ? order by date desc');
    getData.execute([stockId], function(err, resp) {
        if(!err && resp.rows.length > 0){
            var csv = resp.cols.join(',');
            var search = csv.split(',date,')[0];
            var pos = search.split(',').length;
            var data = resp.rows;
            for (var i = 0; i < resp.rows.length; i++){
               data[i][pos] = moment(resp.rows[i][pos]).format("YYYY-MM-DD");
               csv = csv + '\n' + data[i].join(',');
            }
            res.contentType('csv');
            res.send(csv);
        } else {
            res.json({message:'record not found'});
        }
    });
    
});

app.get('/api/ta/py/asc/:stockId', function(req, res) {
    
    var stockId = req.params.stockId;
    var getData = db.Query('SELECT * FROM ta where symbol = ? order by date asc');
    getData.execute([stockId], function(err, resp) {
        if(!err && resp.rows.length > 0){
            var csv = resp.cols.join(',');
            var search = csv.split(',date,')[0];
            var pos = search.split(',').length;
            var data = resp.rows;
            for (var i = 0; i < resp.rows.length; i++){
               data[i][pos] = moment(resp.rows[i][pos]).format("YYYY-MM-DD");
               csv = csv + '\n' + data[i].join(',');
            }
            res.contentType('csv');
            res.send(csv);
        } else {
            res.json({message:'record not found'});
        }
    });
    
});

app.get('/api/ta/r/:stockId', function(req, res) {
    
    var stockId = req.params.stockId;
    request.post({
        url:'http://10.0.0.114:8004/ocpu/github/twistedogic/TAA/R/TAA', 
        json: {"id":stockId,"endPoint":"http://10.0.0.114:3000/api/hist/desc/"}
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

app.get('/api/news/tc/:stockId', function(req, res) {
    res.json({message:'coming soon'});
});
app.get('/api/news/en/:stockId', function(req, res) {
    res.json({message:'coming soon'});
});
app.get('/api/info/:stockId', function(req, res) {
    res.json({message:'coming soon'});
});

app.post('/api/ta/json/:stockId', function(req, res) {
    
    var stockId = req.params.stockId;
    console.log(stockId);
    var data = req.body;
    var len = data.length - 1;
    var latest = data[len].date;
    var pushData = db.Insert('ta');
    var getData = db.Select('stockHist')
        .columns(['date'])
        .where({
            symbol: stockId,
            date: latest
        })
        .limit(1);
    getData.run(function(err, resp) {
        if(resp.rows.length < 1){
            pushData.data(data).run(function(err, ret) {
                if(!err){
                    console.log(ret);
                }
                res.end('It worked!');
            });
        } else {
            res.end('It worked!');
            console.log("nope");
        }
    });
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("server listening at " + port);
var me = process.argv[2] || process.env.CUSER; // Set this to your own account
var password = process.argv[3] || process.env.PASS;
var cred = {
    account:me,
    password:password
};
var Cloudant = require('cloudant')(cred);
var db = Cloudant.use('stock');
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan = require('morgan');
var request = require('request');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ 
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.json({limit: '50mb'}));

//logger
app.use(morgan('tiny'));

var port = process.env.OPENSHIFT_INTERNAL_PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000; // set our port
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
    db.view('symbol_indexer',stockId,function(err,result) {
    	if(err){
    		res.json({error:err});
    	} else {
    		var data = result.rows;
	        var symbol = data[0].id.split('.HK')[0] + '.HK';
	        var csv = "symbol,date,open,high,low,close,volume";
	        for(var i = 0;i < result.rows.length; i++){
	            var ohlc = data[i].value;
	            if (ohlc.open != null && ohlc.high != null && ohlc.low != null && ohlc.close != null && ohlc.volume != null){
	                csv = csv + '\n' + symbol + ',' + data[i].key + ',' + ohlc.open + ',' + ohlc.high + ',' + ohlc.low + ',' + ohlc.close + ',' + ohlc.volume;
	            }
	        }
	        res.contentType('csv');
            res.send(csv);
    	}
    })
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

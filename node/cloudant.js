var me = process.argv[2]; // Set this to your own account
var password = process.argv[3];
var cred = {
    account:me,
    password:password
};
var Cloudant = require('cloudant')(cred);
var db = Cloudant.use("stock");
var request = require('request');
var moment = require('moment');
var fs = require('fs');
var fileUrl = process.argv[4] || 'https://raw.githubusercontent.com/twistedogic/chronoJob/master/bluechip'

console.log(cred);
request(fileUrl,function(err,res,body){
    if (!err){
        fs.writeFileSync(__dirname + '/target', body);
    }
});

setTimeout(function(){
    var allStock = fs.readFileSync(__dirname + '/target','utf8');
    var lines = allStock.split('\n');
    var stockIds = [];
    for (var i = 0; i < lines.length; i++){
        stockIds.push(lines[i].split('_')[0]);
    }
    for (var i = 0; i < stockIds.length; i++){
        var url = 'http://finance.yahoo.com/_td_charts_api/resource/charts;gmtz=8;indicators=quote;range=2y;rangeSelected=undefined;ticker=' + stockIds[i];
        request({
            url: url
	    }, function (err, res, body) {
	        if (err) { return cb(err); }
			if (res.statusCode == 200){
				var body = JSON.parse(body);
				var data = body.data;
				var symbol = data.meta.symbol;
				var time = data.timestamp;
				var ohlc = data.indicators.quote[0];
				var open = ohlc.open;
				var high = ohlc.high;
				var low = ohlc.low;
				var close = ohlc.close;
				var volume = ohlc.volume;
				var adj = close;
				console.log(symbol);
				var json = [];
				for (var j = 0; j < time.length; j++){
				    if (close[j] != null){
    					var value = {
    					    _id: symbol + time[j],
    					    type: 'hist',
    						symbol: symbol,
    						date: moment.unix(time[j]).utcOffset('+0800').format("YYYY-MM-DD"),
    						unix: time[j],
    						data:{
    						    open: open[j],
        						high: high[j],
        						low: low[j],
        						close: close[j],
        						volume: volume[j],
        						adj: adj[j]
    						}
    					};
    					json.push(value);
				    }
				}
				var docs={docs:json};
				db.bulk(docs,function(err,res){
				    if(!err){
				        console.log(res);
				    } else {
				        throw err;
				    }
				})
			} else {
				console.log('fail to download '+ stockIds[i]);
			}
		});
	}
},10000);

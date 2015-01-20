var crate = require('node-crate');
var crateIP = process.argv[2];
crate.connect(crateIP, 4200);
// var scheme = 'create table stockHist (symbol string primary key, date string, unix long primary key, open float, high float, low float, close float, volume long, adj float) with (number_of_replicas = 2)';
// crate.execute(scheme).success(console.log).error(console.error);
var request = require('request');
var moment = require('moment');
var fs = require('fs');

var allStock = fs.readFileSync('../bluechip','utf8');
var lines = allStock.split('\n');
var stockIds = [];
for (var i = 0; i < lines.length; i++){
  stockIds.push(lines[i].split('_')[0]);
}
for (var i = 0; i < stockIds.length; i++){
    crate.execute ("select symbol,unix from stockHist where symbol = ? order by unix desc limit 1", [stockIds[i]]).success (function (res){
        var latest = res.json[0].unix;
        var url = 'http://finance.yahoo.com/_td_charts_api/resource/charts;gmtz=8;indicators=quote;range=2y;rangeSelected=undefined;ticker=' + res.json[0].symbol;
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
				for (var j = 0; j < time.length; j++){
					var value = {
						symbol: symbol,
						date: moment.unix(time[j]).zone('+0800').format("YYYY-MM-DD"),
						unix: time[j],
						open: open[j],
						high: high[j],
						low: low[j],
						close: close[j],
						volume: volume[j],
						adj: adj[j]
					};
					if (latest < time[j]){
						crate.insert('stockHist', value).success(console.log).error(console.error);
					}
				}
			} else {
				console.log('fail to download '+ stockIds[i]);
			}
		});
    });
}
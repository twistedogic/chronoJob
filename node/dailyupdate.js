var fs = require('fs');
var request = require('request');
var moment = require("moment");
var stockIds = fs.readdirSync(__dirname + '/dataset');
for(var i = 0; i < stockIds.length; i++){
    stockIds[i] = stockIds[i].split('.')[0] + '.' + stockIds[i].split('.')[1];
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
          var j = time.length - 1;
          var output = '\n' + symbol + ',' + moment.unix(time[j]).zone('+0800').format("YYYY-MM-DD") + ',' + open[j] + ',' + high[j] + ',' + low[j] + ',' + close[j] + ',' + volume[j] + ',' + adj[j];
          fs.appendFileSync(__dirname + '/dataset/' + symbol + '.csv', output);
      } else {
        console.log('fail to download '+ stockIds[i]);
      }
    });
}
console.log('Scraping...');
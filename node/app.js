var fs = require('fs');
var request = require('request');
var moment = require("moment");
var time = moment().zone('+0800').format("YYYY-MM-DD");
var allStock = fs.readFileSync('../bluechip','utf8');
var lines = allStock.split('\n');
var stockIds = [];

// for (var i = 0; i < lines.length; i++){
//   stockIds.push(lines[i].split('_')[0]);
// }


// ALL
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

for (var i = 0; i < 9999; i++){
  var temp = [];
  temp.push(pad(i,4));
  temp.push('HK');
  temp = temp.join('.');
  stockIds.push(temp);
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
          var output = 'Date,Open,High,Low,Close,Volume,Adj.Close';
          for (var j = 0; j < time.length; j++){
              output = output + '\n' + moment.unix(time[j]).zone('+0800').format("YYYY-MM-DD") + ',' + open[j] + ',' + high[j] + ',' + low[j] + ',' + close[j] + ',' + volume[j] + ',' + adj[j];
          }
          var lookup = 'setSymbolLookup(`' + symbol + '`=list(src="csv",format="%Y-%m-%d"))' + '\n';
          fs.writeFileSync(__dirname + '/dataset/' + symbol + '.csv', output);
          fs.appendFileSync(__dirname + '/lookupTable.r', lookup);
      } else {
        console.log('fail to download '+ stockIds[i]);
      }
    });
}
console.log('Scraping...');
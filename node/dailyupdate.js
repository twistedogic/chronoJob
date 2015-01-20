var fs = require('fs');
var request = require('request');
var moment = require("moment");
var inspect = require('util').inspect;
var Client = require('mariasql');
var fs = require('fs');

var allStock = fs.readFileSync('../bluechip','utf8');
var lines = allStock.split('\n');
var stockIds = [];
for (var i = 0; i < lines.length; i++){
  stockIds.push(lines[i].split('_')[0]);
}

var c = new Client();
c.connect({
  host: '192.168.100.70',
  user: 'root'
});
c.on('connect', function() {
   console.log('Client connected');
 })
 .on('error', function(err) {
   console.log('Client error: ' + err);
 })
 .on('close', function(hadError) {
   console.log('Client closed');
 });

c.query("CREATE DATABASE IF NOT EXISTS stock;")
 .on('result', function(res) {
   res.on('error', function(err) {
     console.log('Result error: ' + inspect(err));
   })
   .on('end', function(info) {
     console.log('Result finished successfully');
   });
 })
 .on('end', function() {
   console.log('Done with all results');
 });

c.query("CREATE TABLE IF NOT EXISTS stock.hist (symbol varchar(255), Date varchar(255), Open varchar(255),Low varchar(255),High varchar(255),Close varchar(255),Volume varchar(255),AdjClose varchar(255));")
 .on('result', function(res) {
   res.on('error', function(err) {
     console.log('Result error: ' + inspect(err));
   })
   .on('end', function(info) {
     console.log('Result finished successfully');
   });
 })
 .on('end', function() {
   console.log('Done with all results');
 });

c.query("CREATE TABLE IF NOT EXISTS stock.ta (symbol varchar(255),Date varchar(255),Open varchar(255),High varchar(255),Low varchar(255),Close varchar(255),Volume varchar(255),pricechange varchar(255),rsi varchar(255),smi varchar(255),smiSignal varchar(255),macd varchar(255),macdSignal varchar(255),Lower varchar(255),Middle varchar(255),Upper varchar(255),ptcB varchar(255),tr varchar(255),atr varchar(255),trueHigh varchar(255),trueLow varchar(255),cV varchar(255),tdi varchar(255),di varchar(255),DIp varchar(255),DIn varchar(255),DX varchar(255),ADX varchar(255),mfi varchar(255),obv varchar(255),sar varchar(255),dviMag varchar(255),dviStr varchar(255),dvi varchar(255),sma10 varchar(255),sma20 varchar(255),sma50 varchar(255),sma100 varchar(255),sma150 varchar(255),sma250 varchar(255),roc5 varchar(255),roc10 varchar(255),roc20 varchar(255),roc50 varchar(255),roc100 varchar(255),roc150 varchar(255),roc250 varchar(255));")
 .on('result', function(res) {
   res.on('error', function(err) {
     console.log('Result error: ' + inspect(err));
   })
   .on('end', function(info) {
     console.log('Result finished successfully');
   });
 })
 .on('end', function() {
   console.log('Done with all results');
 });
 
var pq = c.prepare('INSERT INTO stock.hist (symbol,Date,Open,Low,High,Close,Volume,AdjClose) VALUES (?,?,?,?,?,?,?,?)');
c.query('SELECT date FROM stock.hist ORDER BY date DESC LIMIT 1')
.on('result', function(res) {
  res.on('row', function(row) {
      var latest = moment(row.date).add(8,'h').unix();
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
              for (var j = 0; j < time.length; j++){
                if (latest < time[j]){
                  output = [symbol,moment.unix(time[j]).zone('+0800').format("YYYY-MM-DD"),open[j],high[j],low[j],close[j],volume[j],adj[j]];
                  c.query(pq(output))
                    .on('result', function(res) {
                      res.on('row', function(row) {
                        console.log('Result row: ' + inspect(row));
                      }).on('error', function(err) {
                        console.log('Result error: ' + inspect(err));
                      }).on('end', function(info) {
                        console.log('Result finished successfully');
                      });
                    })
                    .on('end', function() {
                        console.log('success');
                    });
                }
              }
            } else {
              console.log('fail to download '+ stockIds[i]);
            }
          });
        }
   })
   .on('error', function(err) {
     console.log('Result error: ' + inspect(err));
   })
   .on('end', function(info) {
     console.log('Result finished successfully');
   });
 })
 .on('end', function() {
   console.log('Done with all results');
 });

setTimeout(function() {
    c.end()
}, 60000);

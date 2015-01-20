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
 
var pq = c.prepare('INSERT INTO stock.hist (symbol,date,open,low,high,close,volume,AdjClose) VALUES (?,?,?,?,?,?,?,?)');

var queries=[];
for (var i = 0; i < stockIds.length; i++){
    var csv = fs.readFileSync(__dirname + '/dataset/' + stockIds[i] + '.csv','utf8');
    csv = csv.split('\n');
    for (var j = 1; j < csv.length; j++){
        c.query(pq(csv[j].split(',')))
            .on('result', function(res) {
                res.on('error', function(err) {
                    console.log('Result error: ' + inspect(err));
                })
                .on('end', function(info) {
                    console.log('Result finished successfully');
                });
            })
            .on('end', function() {});
    }
}

c.end();

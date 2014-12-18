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
  host: '192.168.100.74',
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

c.query("CREATE TABLE IF NOT EXISTS stock.hist (symbol varchar(255), date varchar(255), open varchar(255),low varchar(255),high varchar(255),close varchar(255),volume varchar(255),AdjClose varchar(255));")
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
            })
            .on('end', function() {
            });
    }
}

c.end();

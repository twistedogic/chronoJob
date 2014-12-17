var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['172.17.2.141']});
var assert = require('assert');
var fs = require('fs');

var allStock = fs.readFileSync('../bluechip','utf8');
var lines = allStock.split('\n');
var stockIds = [];
for (var i = 0; i < lines.length; i++){
  stockIds.push(lines[i].split('_')[0]);
}

client.execute("CREATE KEYSPACE IF NOT EXISTS stock WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };",function(err){
    if (err){console.log(err)} else {
        console.log('KEYSPACE created');
    }
})
client.execute('CREATE TABLE IF NOT EXISTS stock.hist (symbol varchar, date varchar, open varchar,low varchar,high varchar,close varchar,volume varchar,AdjClose varchar,PRIMARY KEY (symbol,date));',function(err){
    if (err){console.log(err)} else {
        console.log('Table created');
    }
})

var queries=[];
for (var i = 0; i < stockIds.length; i++){
    var csv = fs.readFileSync(__dirname + '/dataset/' + stockIds[i] + '.csv','utf8');
    csv = csv.split('\n');
    for (var j = 1; j < csv.length; j++){
        queries.push({
            query: 'INSERT INTO stock.hist (symbol,date,open,low,high,close,volume,AdjClose) VALUES (?,?,?,?,?,?,?,?)',
            params: csv[j].split(',')
        });
    }
}

var queryOptions = { consistency: cassandra.types.consistencies.quorum,prepare : true};
client.batch(queries, queryOptions, function(err) {
    assert.ifError(err);
    console.log('Data updated on cluster');
});
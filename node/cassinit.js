var cassandra = require('cassandra-driver');
var assert = require('assert');
var client = new cassandra.Client({contactPoints: ['172.17.2.141']});
// client.connect(function (err) {
//     if(!err){
//         console.log('connected');
//     } else {
//         console.log(err);
//     }
// });
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

// var queries = [
//   {
//     query: "CREATE KEYSPACE IF NOT EXISTS stock WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };"
//   },
//   {
//     query: "CREATE TABLE IF NOT EXISTS stock.hist (symbol varchar, date varchar, open varchar,low varchar,high varchar,close varchar,volume varchar,AdjClose varchar,PRIMARY KEY (symbol,date));"
//   }
// ];
// var queryOptions = { consistency: cassandra.types.consistencies.quorum };
// client.batch(queries, queryOptions, function(err) {
//   assert.ifError(err);
//   console.log('cluster ready');
// });
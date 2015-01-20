var couchbase = require('couchbase');
var ql = require('couchbase').N1qlQuery;
var myCluster = new couchbase.Cluster('couchbase://192.168.100.77');
var myBucket = myCluster.openBucket('stock');
var query = ql.fromString('SELECT * FROM stock');
myBucket.query(query, function(err, res) {
  if (err) {
    console.log('query failed', err);
    return;
  }
  console.log('success!', res);
  process.exit(code=0);
});
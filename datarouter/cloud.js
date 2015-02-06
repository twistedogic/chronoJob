var fs = require('fs');
var me = process.argv[2]; // Set this to your own account
var password = process.argv[3];
var cred = {
    account:me,
    password:password
};
var Cloudant = require('cloudant')(cred);
var db = Cloudant.use("stock");

console.log(cred);

var data = fs.readFileSync('../../stockhist_3_.json','utf8');
data = data.split('\n');
data.pop();
var json = [];
for (var i = 0; i < data.length; i++){
    var tmp = JSON.parse(data[i]);
    var value = {
        _id: tmp.symbol + tmp.unix,
        type: "hist",
        date: tmp.date,
        unix: tmp.unix,
        symbol: tmp.symbol,
        data:{
            "open":tmp.open,
            "high":tmp.high,
            "low":tmp.low,
            "close":tmp.close,
            "volume":tmp.volume,
            "adj":tmp.adj
        }
    }
    json.push(value);
}
var docs = {docs:json};
db.bulk(docs,function(err,res){
    if(!err){
        console.log('OK');
    } else {
        throw err;
    }
})
// Cloudant(cred, function(err, cloudant) {
//     if(!err){
//         console.log('Connected to Cloudant');
//         cloudant.db.list(function(err, all_dbs) {
//             console.log('All my databases: %s', all_dbs.join(', '));
//         })
//     }
// })
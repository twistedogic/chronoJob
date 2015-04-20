var PouchDB = require('pouchdb');
var _ = require('lodash');
var is = require('is_js');
var db = new PouchDB('http://10.0.0.114:5984/companyinfo');
var options = [
    'financial-ratios',
	'balance-sheet',
	'cashflow-statement',
	'income-statement',
	'earnings-summary',
// 	'dividend-history',
	'fundamentals'
	];
Array.prototype.move = function(from,to){
    this.splice(to,0,this.splice(from,1)[0]);
    return this;
};
//0-4
db.query('info/' + options[0]).then(function (res) {
    var data = res.rows;
    for (var i = data.length - 1; i >= 0; i--) {
        var info = JSON.parse(data[i].key);
        for (var m = 0; m < info.length; m++) {
            console.log(info[m].cover_period);
        }
    }
}).catch(function(err){
    console.log(err);
})
var PouchDB = require('pouchdb');
var db = new PouchDB('companyinfo');
var fs = require('fs');
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
db.query('companyinfo2/' + options[0]).then(function (res) {
    var data = res.rows;
    var json = JSON.parse(data[0].key);
    console.log(json);
}).catch(function (err) {
    console.log(err);
});
var PouchDB = require('pouchdb');
var db = new PouchDB('http://10.0.0.114:5984/companyinfo');

var target = [
    'financial-ratios',
	'balance-sheet',
	'cashflow-statement',
	'income-statement',
	'earnings-summary',
// 	'dividend-history',
	'fundamentals'
	];
var view_function={};
for (var i = 0;i < target.length;i++){
    view_function[target[i]] = {
        map:"function (doc){if(doc._id.indexOf('" + target[i] + "') > -1){emit(doc.data)}}"
    }
}
var ddoc = {
    _id: '_design/info',
    views: view_function
};
// save it
db.put(ddoc).then(function (res) {
    console.log(res);
}).catch(function (err) {
    console.log(err);
});

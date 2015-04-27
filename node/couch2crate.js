var PouchDB = require('pouchdb');
var _ = require('lodash');
var is = require('is_js');
var db = new PouchDB('http://10.0.0.114:5984/companyinfo');
var all = new PouchDB('http://10.0.0.114:5984/all');
var option = new PouchDB('http://10.0.0.114:5984/options')
var crate = require('node-crate');
crate.connect ('10.0.0.131', 4200)
var options = [
    'financial-ratios',
    'balance-sheet',
    'cashflow-statement',
    'income-statement',
    'earnings-summary',
    'dividend-history',
    'fundamentals'
    ];
Array.prototype.move = function(from,to){
    this.splice(to,0,this.splice(from,1)[0]);
    return this;
};
//0-4
// db.query('info/' + options[5]).then(function (res) {
//     var data = res.rows;
//     var name = data[0].key._id.substring(5);
//     var name = name.split('-').join('_');
//     for (var i = 0; i < data.length; i++) {
//         var doc = JSON.parse(data[i].key.data);
//         for (var j = 0; j < doc.length; j++) {
//             var info = doc[j];
//             var date = info.as_of_date;
//             if(info.dollar_amount_unit){
//                 var dollar = info.dollar_amount_unit.en;
//                 info.dollar_amount_unit = dollar;
//             }
//             if(info.period_loc){
//                 var period = info.period_loc.en;
//                 info.period_loc = period;
//             }
//             var id = info.symbol + '_' + date.split('-')[0] + '_' + date.split('-')[1];
//             info['id'] = id;
//             crate.insert(name,info).success(console.log);
//         }
//     }
// }).catch(function(err){
//     console.log(err);
// })    

// db.query('info/' + options[6]).then(function (res) {
//     var data = res.rows;
//     var name = data[0].key._id.substring(5);
//     for (var i = 0; i < data.length; i++) {
//         var doc = JSON.parse(data[i].key.data);
//         doc['id'] = doc.symbol;
//         crate.insert(name,doc).success(console.log);
//     }
// }).catch(function(err){
//     console.log(err);
// })

// all.allDocs({include_docs: true}).then(function (res) {
//     var data = res.rows;
//     var tables = [
//     'financial_ratios',
//     'balance_sheet',
//     'cashflow_statement',
//     'income_statement',
//     'earnings_summary',
//     'dividend_history',
//     'fundamentals'
//     ];
//     for (var i = 0; i < data.length; i++) {
//         var name = data[i].doc.data.name;
//         var cat = data[i].doc.data.cat;
//         var stockId = data[i].doc.data.symbols;
//         var update = {};
//         update[cat] = name;
//         for (var m = 0; m < tables.length; m++) {
//             for (var j = 0; j < stockId.length; j++) {
//                 var target = "symbol = '" + stockId[j] + "'";
//                 crate.update(tables[m],update,target).success(console.log).error(console.log);
//             }
//         }
        
//     }
// })

option.allDocs({include_docs: true}).then(function (res) {
    var data = res.rows;
    var tables = [
    'financial_ratios',
    'balance_sheet',
    'cashflow_statement',
    'income_statement',
    'earnings_summary',
    'dividend_history',
    'fundamentals'
    ];
    for (var i = 0; i < data.length; i++) {
        var name = data[i].doc.data.name;
        var stockId = data[i].doc.data.symbol;
        var update = {};
        update['option'] = true;
        update['tickname'] = name;
        for (var m = 0; m < tables.length; m++) {
            var target = "symbol = '" + stockId + ":HK'";
            console.log(target);
            crate.update(tables[m],update,target).success(console.log).error(console.log);
        }
        
    }
})
var PouchDB = require('pouchdb');
var _ = require('lodash');
var is = require('is_js');
var db = new PouchDB('http://10.0.0.114:5984/companyinfo');
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
// for (var i = 0; i < options.length; i++) {
//     var option = options[i].replace('-','_');
//     crate.drop(option).success(console.log);
// }
Array.prototype.move = function(from,to){
    this.splice(to,0,this.splice(from,1)[0]);
    return this;
};

//0-4
for (var m = 0; m < options.length - 1; m++) {
    db.query('info/' + options[m]).then(function (res) {
        var data = res.rows;
        var name = data[0].key._id.substring(5);
        var name = name.split('-').join('_');
        for (var i = 0; i < data.length; i++) {
            var doc = JSON.parse(data[i].key.data);
            var current = 0;
            for (var j = 0; j < doc.length; j++) {
                var info = doc[j];
                if (Object.keys(info).length > current){
                    current = Object.keys(info).length;
                    var type = [];
                    var key = Object.keys(info);
                    var table = {
                        id:'string primary key',
                        industry:'string',
                        sector:'string',
                        sub_industry:'string'
                    };
                    for (var k = 0; k < key.length; k++) {
                        if (typeof info[key[k]] === 'object') {
                            table[key[k]] = 'string';
                        } else {
                            if(typeof info[key[k]] === 'number'){
                                table[key[k]] = 'float';
                            } else {
                                table[key[k]] = typeof info[key[k]];
                            }
                        }
                    }
                }
            }
        }
        var col = {};
        col[name] = table;
        console.log(col);
        crate.create(col).success(console.log);
    }).catch(function(err){
        console.log(err);
    })
};


db.query('info/' + options[6]).then(function (res) {
    var data = res.rows;
    var name = data[0].key._id.substring(5);
    var current = 0;
    for (var i = 0; i < data.length; i++) {
        var doc = JSON.parse(data[i].key.data);
        if (Object.keys(doc).length > current){
            current = Object.keys(doc).length;
            var type = [];
            var key = Object.keys(doc);
            var table = {
                id:'string primary key',
                industry:'string',
                sector:'string',
                sub_industry:'string'
            };
            for (var k = 0; k < key.length; k++) {
                if (typeof doc[key[k]] === 'object') {
                    table[key[k]] = 'string';
                } else {
                    if(typeof doc[key[k]] === 'number'){
                        table[key[k]] = 'float';
                    } else {
                        table[key[k]] = typeof doc[key[k]];
                    }
                }
            }
        }
    }
    var col = {};
    col[name] = table;
    crate.create(col).success(console.log);
}).catch(function(err){
    console.log(err);
})
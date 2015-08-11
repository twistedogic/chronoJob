var targets = require('../conf/symbols.js');
var fundamental = require('../lib/fundamental/fundamental.js');
var sector = require('../lib/fundamental/sector.js');
var async = require('async');
var fs = require('fs');
var toCSV = require('../lib/util/toCSV.js');

// var symbol = targets.options;
function sectortoCSV(input){
    var json = {};
    var key = _.keys(input);
    var header = key.join(',');
    _.forEach(key,function(n){
        _.forEach(_.keys(input[n]),function(m){
            _.forEach(input[n][m],function(k){
                json[k][n] = m;
            })
        })
    })
    var output = []
    _.forEach(_.keys(json),function(n){
        output.push({
            symbol:n,
            sector:json[n]["sector"],
            industry:json[n]["industry"],
            sub_industry:json[n]["sub_industry"]
        })
    })
    return toCSV(output);
}

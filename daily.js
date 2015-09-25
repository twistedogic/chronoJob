var _ = require('lodash');
var moment = require('moment');
var async = require('async');
var config = require('./conf/config.js');
var symbols = require('./conf/symbols.js');
var options = require('./lib/options/options.js');
var daily = require('./lib/options/daily.js');
var ta = require('./lib/technical/ta.js');
var mongoWrite = require('./lib/util/mongoWrite.js');

var target = symbols.options;
var targetDate = moment().subtract(1,'day').format('YYYYMMDD');
var startDate = moment().subtract(1,'year').format('YYYYMMDD');
console.log(startDate.slice(2));
console.log(targetDate.slice(2));
var mapInput = function(input){
    var arr = [];
    _.each(_.keys(input),function(n){
        var json = {}
        json[n] = input[n];
        arr.push(json);
    });
    return arr;
}

// ta(target,function(err,res){
//     if(err){
//         console.log(err)
//     } else {
//         var data = {technical:mapInput(res)};
//         // async.map(mapInput(res),mongoWrite,function(err,res){
//         //     if(err){
//         //         console.log('sector: ' + err);
//         //     } else {
//         //         console.log('sector: ' + JSON.stringify(res));
//         //     }
//         // });
//     }
// }) 
var _ = require('lodash');
var async = require('async');
var config = require('./conf/config.js');
var symbols = require('./conf/symbols.js');
var sector = require('./lib/fundamental/sector.js');
var fundamental = require('./lib/fundamental/fundamental.js');
var ta = require('./lib/technical/ta.js');
var mongoWrite = require('./lib/util/mongoWrite.js');

var target = symbols.options;
var mapInput = function(input){
    var arr = [];
    _.each(_.keys(input),function(n){
        var json = {}
        json[n] = input[n];
        arr.push(json);
    });
    return arr;
}
sector(target,function(err,res){
    if(err){
        console.log(err)
    } else {
        async.map(mapInput(res),mongoWrite,function(err,res){
            if(err){
                console.log('sector: ' + err);
            } else {
                console.log('sector: ' + JSON.stringify(res));
            }
        });
    }
})
fundamental(target,function(err,res){
    if(err){
        console.log(err)
    } else {
        async.map(mapInput(res),mongoWrite,function(err,res){
            if(err){
                console.log('fundamental: ' + err);
            } else {
                console.log('fundamental: ' + JSON.stringify(res));
            }
        });;
    }
})
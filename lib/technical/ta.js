var talib = require('talib');
var async = require('async');
var _ = require('lodash');
var request = require('request');
var moment = require('moment');
var zp = require('../util/zp.js');
var config = require('../../conf/config.js');

function getData(input,callback){
    var url = config.base_url + zp(input) + "/" + config.quote;
    request(url,function(err,res,body){
        if(err){
            callback(err)
        } else {
            var data = JSON.parse(body);
            var output = {};
            _.each(_.keys(data),function(m){
                if(_.isArray(data[m])){
                    output[m] = data[m].reverse(); 
                }
            })
            callback(null,output);
        }
    })
}

function method(input,callback){
    var functions = talib.functions;
    var inputs = [];
    _.each(functions,function(m){
        inputs.push(m.inputs);
    })
    inputs = _.flatten(inputs);
}

function technical(input,callback){
    getData(input,function(err,res){
        method(res,callback);
    })
}

module.exports = function(input,callback){
    async.map(input,technical,function(err,res){
        console.log(_.keys(res[0]));
    })
}
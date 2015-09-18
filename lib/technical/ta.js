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
    var end = input.c.length - 1;
    var methods = config.technical;
    for (var i = 0; i < methods.length; i++) {
        var tmp = methods[i];
        tmp.endIdx = end;
        if(tmp.inReal){
            tmp.inReal = input.c;
        } else {
            tmp.high = input.h;
            tmp.low = input.l;
            tmp.close = input.c;
        }
        methods[i] = tmp;
    }
    var output = input;
    async.map(methods,ta,function(err,res){
        if(err){
            callback(err);
        } else {
            var data = _.flatten(res);
            _.each(res,function(n){
                _.each(_.keys(n),function(m){
                    output[m] = n[m];
                });
            })
            callback(null,output);
        }
    })
    
}

function ta(input,callback){
    talib.execute(input,function(res){
        if(res){
            var method = input.methodName;
            var data = res.result;
            var output = {};
            _.each(_.keys(data),function(n){
                var name = _.snakeCase(n).split('_');
                name = _.uniq(_.filter(name,function(m){
                    return m !== "out" && m !== "real";
                })).join('_');
                if(name){
                    var keyname = method + "_" + name;
                } else {
                    var keyname = method;
                }
                keyname = keyname.toLowerCase();
                output[keyname] = data[n]
            })
            callback(null,output);
        } else {
            callback('no result');
        }
    })
}

function technical(input,callback){
    getData(input,function(err,res){
        method(res,function(e,r){
            if(e){
                callback(e);
            } else {
                var data = r;
                data['symbol'] = zp(input);
                callback(null,data);
            }
        });
    })
}

module.exports = function(input,callback){
    async.map(input,technical,function(err,res){
        if(err){
            callback(err);
        } else {
            var output = [];
            _.each(res,function(m){
                var min = 1000;
                _.each(_.keys(m),function(n){
                    var datalength = m[n];
                    if(datalength<min && datalength>10){
                        min = datalength;
                    }
                })
                for (var i = 0; i < min.length; i++) {
                    var json = {
                        _id:null,
                        data:{}
                    };
                    _.each(_.keys(m),function(n){
                        if(n !== 'symbol'){
                            json.data[n] = m[n][i];
                        }
                    })
                    json._id = m.symbol + m.t[i];
                }
                output.push(json);
            })
            console.log(output[0]);
            callback(null,output);
        }
    })
}
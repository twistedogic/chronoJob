var async = require('async');
var request = require('request');
var _ = require('lodash');
var COT = require('../util/createOptionTarget.js');
var toJSON = require('../util/toJSON.js');
var fs = require('fs');

function getData(input,callback){
    var output = {};
    request(input.url,function(err,res,body){
        if(err){
            callback(err);
        } else {
            output[input.type] = body;
            callback(null,output);
        }
    })
}
function cleanUp(input){
    var type = [];
    _.each(input,function(n){
        type.push(_.keys(n));
    })
    type = _.uniq(_.flatten(type));
    var soe = [];
    var pcr = [];
    _.each(type,function(n){
        var data = _.filter(_.flatten(_.map(input,n)),function(m){
            return m
        })[0];
        data = _.filter(data.split('\r\n'),function(m){
            return m.split(',').length > 1
        });
        if(n == 'soe'){
            var header = [];
            _.each(data[0].split(','),function(m){
                header.push(_.snakeCase(m))
            })
            for (var i = 1; i < data.length; i++) {
                var json = {}
                var content = data[i].split(',')
                for (var j = 0; j < content.length; j++) {
                    json[header[j]] = content[j];
                }
                json['_id'] = _.snakeCase(json.date) + json.underlying_code;
                soe.push(json);
            }
        } else {
            var symbol = data[0].split(',')[1];
            var header = [];
            _.each(data[1].split(','),function(m){
                header.push(_.snakeCase(m))
            })
            header[0] = 'date';
            for (var i = 2; i < data.length; i++) {
                var json = {}
                var content = data[i].split(',')
                for (var j = 0; j < content.length; j++) {
                    json[header[j]] = content[j];
                }
                json['underlying_name'] = symbol
                json['_id'] = _.snakeCase(json.date + symbol);
                pcr.push(json);
            }
        }
    })
    return {
        soe:soe,
        pcr:pcr
    }
}
module.exports = function(input,callback){
    var targets = COT(input);
    var url = [];
    _.forEach(_.keys(targets),function(n){
        _.forEach(targets[n],function(m){
            url.push({type:n,url:m});
        })
    })
    async.map(url,getData,function(err,res){
        if(err){
            callback(err);
        } else {
            var output = cleanUp(res);
            callback(null,output);
        }
    })
}
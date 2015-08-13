var async = require('async');
var request = require('request');
var _ = require('lodash');
var COT = require('../util/createOptionTarget.js');
var toJSON = require('../util/toJSON.js');
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
function cleanUp(input,type){
    var data = _.map(input,type);
    var filter = [];
    _.forEach(data,function(n){
        if(n){
            filter.push(n);
        }
    })
    data = _.flatten(filter).join('\r\n');
    var csv = data.split('\r\n');
    var rows = [];
    var header;
    _.forEach(csv,function(n){
        if(n && !Number(n.split(',')[6])){
            header = n.split(',');
        }
        if(n && Number(n.split(',')[6])){
            rows.push(n.split(','));
        }
    })
    for (var i = 0; i < header.length; i++) {
        header[i] = header[i].replace(/[^a-zA-Z0-9]+/g, "")
    }
    rows.unshift(header);
    for (var i = 0; i < rows.length; i++) {
        rows[i] = rows[i].join(',');
    }
    var json = toJSON(rows.join('\n'));
    return json;
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
            var data = { soe:cleanUp(res,'soe'),pcr:cleanUp(res,'pcr') };
            console.log(data.pcr);
            callback(null,data);
        }
    })
}
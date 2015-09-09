var createTarget = require("../util/createTarget.js");
var flatten = require("../util/flatten.js");
var config = require("../../conf/config.js");
var request = require("request");
var async = require("async");
var _ = require("lodash");
var fs = require("fs");

function prepareUrl(input){
    var json = [];
    var target = config.report;
    _.forEach(target,function(n){
        _.forEach(createTarget(input,n),function(m){
            json.push({
                type:n,
                url:m
            });
        })
    })
    return json;
}

function groupReport(input){
    var json = {};
    _.forEach(input,function(n){
        if(json[n.type]){
            json[n.type].push(n.data);
        } else {
            json[n.type] = n.data;
        }
    })
    return json
}

function getData(input,callback){
    var type = input.type;
    var url = input.url;
    request(url,function(err,res,body){
        if(err){
            callback(err);
        } else {
            var output = [];
            var data = JSON.parse(body);
            if(_.isArray(data)){
                _.forEach(data,function(n){
                    output.push(flatten(n));
                })
            } else {
                output.push(data);
            }
            callback(null,{type:type,data:output});
        }
    })
}

module.exports = function(input,callback){
    var targetUrl = prepareUrl(input);
    async.map(targetUrl,getData,function(err,res){
        if(err){
            callback(err);
        } else {
            var result = groupReport(res);
            callback(null,result);
        }
    })
}
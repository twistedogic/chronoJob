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
            json[n.type] = [n.data];
        }
    })
    _.each(_.keys(json),function(n){
        var collection = [];
        _.each(_.flatten(json[n]),function(m){
            if(m.id){
                m._id = m.id;
            } else {
                if(m.as_of_date){
                    m._id = m.symbol + m.as_of_date;
                } else {
                    m._id = m.symbol;
                }
            }
            collection.push(m);
        })
        json[n] = collection;
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
            callback(null,{type:type,data:data});
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
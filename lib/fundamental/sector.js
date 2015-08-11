var createTarget = require('../util/createTarget.js');
var config = require("../../conf/config.js");
var request = require("request");
var async = require("async");
var _ = require("lodash");
function alphaOnly(a) {
    var b = '';
    for (var i = 0; i < a.length; i++) {
        if (a[i] >= 'A' && a[i] <= 'z') b += a[i];
    }
    return b;
}

module.exports = function(input,callback){
    if(_.isArray(input)){
        var targets = createTarget(input,"info");
        async.map(targets,request,function(err,res){
            if(err){
                callback(err);
            } else {
                var result = {
                    sector:{},
                    sub_industry:{},
                    industry:{}
                };
                var data = _.map(res,'body');
                _.forEach(data, function(n){
                    var json = JSON.parse(n);
                    var field = ['sector','sub_industry','industry'];
                    _.forEach(field,function(m){
                        var tmp = json[m][_.keys(json[m])[0]];
                        var name = tmp.name.en;
                        name = alphaOnly(name);
                        var symbols = tmp.symbols;
                        result[m][name] = symbols;
                    })
                });
                callback(null,result);
            }
        })
    } else {
        callback("Please input array");
    }
}
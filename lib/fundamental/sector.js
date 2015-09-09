var createTarget = require('../util/createTarget.js');
var config = require("../../conf/config.js");
var request = require("request");
var async = require("async");
var _ = require("lodash");
// function alphaOnly(a) {
//     var b = '';
//     for (var i = 0; i < a.length; i++) {
//         if (a[i] >= 'A' && a[i] <= 'z') b += a[i];
//     }
//     return b;
// }

module.exports = function(input,callback){
    if(_.isArray(input)){
        var targets = createTarget(input,"info");
        async.map(targets,request,function(err,res){
            if(err){
                callback(err);
            } else {
                var result = [];
                var data = _.map(res,'body');
                _.each(data, function(n){
                    var output = {};
                    var json = JSON.parse(n);
                    output._id = json.symbol;
                    output.name = json.names.en;
                    var field = ['sector','industry','sub_industry'];
                    _.forEach(field,function(m){
                        var tmp = json[m][_.keys(json[m])[0]];
                        output[m] = tmp.class_key;
                    })
                    result.push(output);
                });
                callback(null,result);
            }
        })
    } else {
        callback("Please input array");
    }
}
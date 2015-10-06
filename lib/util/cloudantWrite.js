var _ = require('lodash');
var config = require('../../conf/config.js');
var Cloudant = require('cloudant');
var username = config.cloudant.username;
var password = config.cloudant.password;
var cloudant = Cloudant({account:username, password:password});

module.exports = function(input,callback){
    var collection = _.keys(input)[0];
    for (var i = 0; i < input[collection].length; i++) {
        input[collection][i]._id = input[collection][i]._id.toString();
    }
    cloudant.db.create(collection, function() {
        var target = cloudant.db.use(collection);
        target.bulk({docs:input[collection]},function(err,res){
            if(err){
                callback(err);
            } else {
                callback(null,res.length);
            }
        })
    });
}
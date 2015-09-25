var MongoClient = require('mongodb').MongoClient;
var _ = require('lodash');
var config = require('../../conf/config.js');
var url = 'mongodb://' + config.mongo_ip + ':27017/' + config.db_name;
var insertDoc = function(db,collection,data,callback) {
    var collection = db.collection(collection);
    collection.insert(data,function(err,res){
        if(err){
            callback(err);
        } else {
            callback(null,res);
        }
    })
}

var getMaster = function(input){
    return 'mongodb://' + input.serverConfig.isMasterDoc.primary + '/' + config.db_name;
}

var connectDB = function(url,callback){
    MongoClient.connect(url,function(err,db){
        if(err){
            callback(err);
        } else {
            callback(null,db);
        }
    });
}

module.exports = function(input,callback){
    var collection = _.keys(input)[0];
    var data = input[collection];
    connectDB(url,function(err,res){
        if(err){
            callback(err);
        } else {
            url = getMaster(res);
            res.close();
            connectDB(url,function(err,db){
                insertDoc(db,collection,data,function(err,res){
                    if(err){
                        callback(err);
                    } else {
                        db.close();
                        callback(null,res.result);
                    }
                })
            });
        }
    })
}
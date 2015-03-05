var PouchDB = require('pouchdb');
var db = new PouchDB('companyinfo');
var fs = require('fs');
var redis = require('redis');
var redisHost = process.argv[2] || '10.0.0.114';
var client = redis.createClient(6379, redisHost, {})
client.keys('*',function(err,res){
    console.log(res[0])
    db.get(res[0],function(error,resp){
        if(!error){
            console.log(resp.data.symbols);
        }
    })
})
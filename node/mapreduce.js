var me = process.argv[2]; // Set this to your own account
var password = process.argv[3];
var cred = {
    account:me,
    password:password
};
var Cloudant = require('cloudant')(cred);
var db = Cloudant.use("stock");
var request = require('request');
var fs = require('fs');

var fileUrl = process.argv[4] || 'https://raw.githubusercontent.com/twistedogic/chronoJob/master/bluechip'
// db.get('_design/symbol_indexer',function(error,response){
// 			db.destroy('_design/symbol_indexer',response._rev,function(error,response){
request(fileUrl,function(err,res,body){
    if (!err){
        var lines = body.split('\n');
        var target = [];
        for (var i = 0; i < lines.length; i++){
            target.push(lines[i].split('_')[0]);
        }
        var symbol_indexer = function(doc) {
		  if (doc.type == 'hist') {
		    index('symbol', doc.symbol)
		  }
		}
		var view_function={};
		for (var i = 0;i < target.length;i++){
		    view_function[target[i]] = {
		        map:"function (doc){if(doc.symbol === '" + target[i] + "'){emit(doc.date,doc.data)}}"
		    }
		}

		var doc = { 
		    _id: '_design/symbol_indexer',
		    indexes:{ 
		        symbol:{
		            analyzer:{
		                name: 'standard'
		            },
		            index: symbol_indexer
		        }
		    },
		    views:view_function
		}
		console.log(doc);
		db.insert(doc, function (er, result) {
			if (er){
				throw er
			} else {
				console.log('Created design document with symbol index')
			}
		})
    }
});
var fs = require('fs');
var request = require('request');
var YQL = require('yql');
var PouchDB = require('pouchdb');
var all = new PouchDB('http://10.0.0.114:5984/all');
var options = new PouchDB('http://10.0.0.114:5984/options');
var fileUrl = process.argv[2] || 'https://raw.githubusercontent.com/twistedogic/chronoJob/master/list/bluechip';
function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// request(fileUrl,function(err,res,body){
//     if (!err){
//         var allStock = body;
// 		var lines = allStock.split('\n');
// 		var stockIds = [];
// 		for (var i = 0; i < lines.length; i++){
// 			var stock = lines[i].split('_')[0].split('.')[0];
// 			stock = pad(stock,5);
// 			stockIds.push(stock);
// 		}
// 		var baseurl = 'https://api.investtab.com/api/quote/';
// 		var options = [':HK/info'];
// 		for (var i = stockIds.length - 1; i >= 0; i--) {
// 			for (var j = options.length - 1; j >= 0; j--) {
// 				var url = baseurl + stockIds[i] + options[j];
// 				request(url,function(err,res,body){
// 				    if(!err){
// 				        var data = JSON.parse(body);
// 				        var info = ['sector', 'industry', 'sub_industry'];
// 				        for (var k = 0; k < info.length; k++) {
// 				            var json = data[info[k]];
// 				            var code = Object.keys(json)[0];
// 				            var json = json[code];
// 				            var name = json.name.en.replace(/(,| | )/g, '_');
// 				            var list = json.symbols;
// 				            var doc = {
// 				                _id: name,
// 				                data: {
// 				                    name: name,
// 				                    symbols: list,
// 				                    cat: info[k]
// 				                }
// 				            };
// 				            all.put(doc).then(function(response) {
//                                 console.log(response);
//                             })
// 				        }
// 				    }
// 				});
// 			};
// 		};
//     }
// });

var query = new YQL('select * from html where url="https://www.hkex.com.hk/eng/sorc/options/stock_options_search.aspx" and xpath=' + "'" + '//*[(@id = "ucode")]' + "'");
query.exec(function (error, response) {
    if(!error){
        var data = response.query.results.select.option;
        data.shift();
        for (var i = 0; i < data.length; i++) {
            var info = data[i];
            var doc = {
                _id: info.value,
                data: {
                    symbol:info.value,
                    name:info.content
                }
            }
            options.put(doc).then(function(r){
                console.log(r);
            })
        }
    }
});

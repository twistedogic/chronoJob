var fs = require('fs');
var request = require('request');
var PouchDB = require('pouchdb');
var db = new PouchDB('http://10.0.0.114:5984/industry');
var fileUrl = process.argv[2] || 'https://raw.githubusercontent.com/twistedogic/chronoJob/master/list/bluechip';
function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

request(fileUrl,function(err,res,body){
    if (!err){
        var allStock = body;
		var lines = allStock.split('\n');
		var stockIds = [];
		for (var i = 0; i < lines.length; i++){
			var stock = lines[i].split('_')[0].split('.')[0];
			stock = pad(stock,5);
			stockIds.push(stock);
		}
		var baseurl = 'https://api.investtab.com/api/quote/';
		var options = [':HK/info'];
		for (var i = stockIds.length - 1; i >= 0; i--) {
			for (var j = options.length - 1; j >= 0; j--) {
				var url = baseurl + stockIds[i] + options[j];
				request(url,function(err,res,body){
				    if(!err){
				        var data = JSON.parse(body);
				        var key = [];
				        var value = [];
				        var info = ['sector', 'industry', 'sub_industry'];
				        for (var k = 0; k < info.length; k++) {
				            var json = data[info[k]];
				            var code = Object.keys(json)[0];
				            var json = json[code];
				            key.push(json.name.en.replace(/(,| | )/g, '_'));
				            var list = json.symbols;
				            for (var m = 0; m < list.length; m++) {
				                var tick = list[m].split(':')
				                tick[0] = tick[0].substring(1);
				                tick = tick.join('.')
				                list[m] = tick;
				            }
				            value.push(list);
				        }
				        for (var k = 0; k < key.length; k++) {
				            var doc = {
				                _id: key[k],
				                data: {
				                    name: key[k],
				                    symbols: value[k]
				                }
				            };
				            db.put(doc).then(function(res){
				            	console.log(res);
				            });
				        }
				    }
				});
			};
		};
    }
});

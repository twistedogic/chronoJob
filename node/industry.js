var fs = require('fs');
var request = require('request');
var PouchDB = require('pouchdb');
var db = new PouchDB('companyinfo');
var fileUrl = process.argv[3] || 'https://raw.githubusercontent.com/twistedogic/chronoJob/master/bluechip';
// var redis = require('redis');
// var redisHost = process.argv[2] || '10.0.0.114';
// var client = redis.createClient(6379, redisHost, {});
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

request(fileUrl,function(err,res,body){
    if (!err){
        fs.writeFileSync(__dirname + '/target', body);
    }
});

setTimeout(function(){
	var allStock = fs.readFileSync(__dirname + '/target','utf8');
	var lines = allStock.split('\n');
	var stockIds = [];
	for (var i = 0; i < lines.length; i++){
		var stock = lines[i].split('_')[0].split('.')[0];
		stock = pad(stock,5);
		stockIds.push(stock);
	}
// 	console.log(stockIds[0]);
// 	var stockIds = ['00001']; //test
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
			         //   client.set(key[k],value[k]);
			        }
			    }
			});
		};
	};
},3000);

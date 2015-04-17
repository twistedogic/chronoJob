var request = require('request');
var PouchDB = require('pouchdb');
var db = new PouchDB('info');
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
//      console.log(stockIds[0]);
//      var stockIds = ['00001']; //test
        var baseurl = 'https://api.investtab.com/api/quote/';
        var options = [
        ':HK/financial-ratios',
        ':HK/balance-sheet',
        ':HK/cashflow-statement',
        ':HK/income-statement',
        ':HK/earnings-summary',
        ':HK/dividend-history',
        ':HK/fundamentals'
//      ':HK/info'
        ];
        for (var i = stockIds.length - 1; i >= 0; i--) {
            for (var j = options.length - 1; j >= 0; j--) {
                var url = baseurl + stockIds[i] + options[j];
                request(url,function(err,res,body){
                    if(!err){
                        var name = res.req.path;
                        name = name.split('/');
                        var key = name[3].split(':')[0] + name[4];
                        var doc = {
                            _id:key,
                            data: body
                        };
                        db.put(doc).then(function(response) {
                            console.log(response);
                        })
                    }
                });
            };
        };
    }
});
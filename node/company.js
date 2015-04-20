var PouchDB = require('pouchdb');
var request = require('request');
var _ = require('lodash');
var is = require('is_js');
var industry = new PouchDB('http://10.0.0.114:5984/industry');
var companyinfo = new PouchDB('http://10.0.0.114:5984/companyinfo');
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

industry.allDocs({include_docs: true}).then(function (res) {
    var data = res.rows;
    var stockId = [];
    for (var i = data.length - 1; i >= 0; i--) {
        stockId = stockId.concat(data[i].doc.data.symbols);
    }
    var stockId = _.uniq(stockId);
    for (var i = 0; i < stockId.length; i++) {
        var stock = stockId[i].split('.')[0];
        stockId[i] = pad(stock,5);
    }
    var baseurl = 'https://api.investtab.com/api/quote/';
    var options = [
    ':HK/financial-ratios',
    ':HK/balance-sheet',
    ':HK/cashflow-statement',
    ':HK/income-statement',
    ':HK/earnings-summary',
    ':HK/dividend-history',
    ':HK/fundamentals'
    ];
    for (var i = stockId.length - 1; i >= 0; i--) {
        for (var j = options.length - 1; j >= 0; j--) {
            var url = baseurl + stockId[i] + options[j];
            request(url,function(err,r,body){
                if(!err){
                    var name = r.req.path;
                    name = name.split('/');
                    var key = name[3].split(':')[0] + name[4];
                    var doc = {
                        _id:key,
                        data: body
                    };
                    var notEmpty = JSON.parse(body);
                    if(is.not.array(notEmpty)){
                        companyinfo.put(doc).then(function(response) {
                            console.log(response);
                        })
                    } else {
                        if(notEmpty.length > 0){
                            companyinfo.put(doc).then(function(response) {
                                console.log(response);
                            })
                        }
                    }
                }
            });
        };
    };
})
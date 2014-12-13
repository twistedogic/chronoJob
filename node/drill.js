var request = require('request');
var qs = require('qs');
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var formData = {
    queryType:'SQL',
    query:'select * from dfs.`/data/info/00001BalanceSheet-AnnualResults.csv`'
};
var data = qs.stringify(formData);

request.post({url:'http://192.168.100.74:8047/query', form: data}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  var doc = new dom().parseFromString(body);
  var nodes = xpath.select('//td', doc);
  for (var i = 0; i < nodes.length; i++){
      console.log(nodes[i].firstChild.data);
  }
});
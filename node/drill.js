var request = require('request');
var qs = require('qs');
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var formData = {
    queryType:'SQL',
    query:'SELECT * FROM cp.`employee.json` LIMIT 20'
};
var data = qs.stringify(formData);

request.post({url:'http://192.168.100.74:8047/query', form: data}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('query failed:', err);
  }
  var doc = new dom().parseFromString(body);
  var nodes = xpath.select('//td', doc);
  var title = xpath.select('//th', doc);
  console.log(title[0].firstChild.data);
  console.log(title.length);
  console.log(nodes.length);
  var nrow = nodes.length/title.length;
  var csv = title[0].firstChild.data;
  for (var i = 1; i < title.length; i++){
      csv = csv + ',' + title[i].firstChild.data;
  }
  for (var k = 0; k < nodes.length; k += title.length){
    csv = csv + '\n' + nodes[k].firstChild.data;
    console.log(k);
    for (var l = 1; l < title.length; l++){
        csv = csv + ',' + nodes[k + l].firstChild.data;
    }
  }
  console.log(csv);
});
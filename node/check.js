var fs = require('fs');
var querystring = require('querystring');
var request = require('request');
var allStock = fs.readFileSync('../fullList','utf8');
var lines = allStock.split('\n');
var stockIds = [];
for (var i = 0; i < lines.length; i++){
  stockIds.push(lines[i].split('_')[0]);
}
// for (var i = 0; i < stockIds.length; i++){
//     var url = 'http://ichart.finance.yahoo.com/table.csv?' + querystring.stringify({
//       s: stockIds[i],
//       g: 'd',
//       ignore: '.csv'
//     });

//     request({
//       url: url
//     }, function (err, res, body) {
//       if (err) { return cb(err); }
//       switch (res.statusCode) {
//       case 200:
//         console.log(res.statusCode);
//       case 404:
//         console.log(res.statusCode);
//       break;
//       default:
//         console.log('ERROR');
//       }
//     });
// }
var url = 'http://ichart.finance.yahoo.com/table.csv?' + querystring.stringify({
    s: '0030.HK',
    g: 'd',
    ignore: '.csv'
  });
  request({
    url: url
  }, function (err, res, body) {
    if (err) { return cb(err); }
    switch (res.statusCode) {
    case 200:
      console.log(res.request.path);
    case 404:
      console.log(res.statusCode);
    break;
    default:
      console.log('ERROR');
    }
  })
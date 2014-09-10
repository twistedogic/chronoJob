var fs = require('fs');
var querystring = require('querystring');
var request = require('request');
var allStock = fs.readFileSync('../fullList','utf8');
var lines = allStock.split('\n');
var stockIds = [];
for (var i = 0; i < lines.length; i++){
  stockIds.push(lines[i].split('_')[0]);
}
for (var i = 0; i < stockIds.length; i++){
    var url = 'http://ichart.finance.yahoo.com/table.csv?' + querystring.stringify({
      s: stockIds[i],
      g: 'd',
      ignore: '.csv'
    });

    request({
      url: url
    }, function (err, res, body) {
      if (err) { return cb(err); }
      var fileName = res.request.path;
      fileName = fileName.split('=')[1].split('&')[0];
      if (res.statusCode == 200){
        // console.log('200');
      } else {
        console.log(fileName);
      }
    });
  }
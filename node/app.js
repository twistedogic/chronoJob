var fs = require('fs');
var querystring = require('querystring');
var request = require('request');
var moment = require("moment");
var time = moment().zone('+0800').format("YYYY-MM-DD");
// var allStock = fs.readFileSync('../fullList','utf8');
// var lines = allStock.split('\n');
var stockIds = [];

// for (var i = 0; i < lines.length; i++){
//   stockIds.push(lines[i].split('_')[0]);
// }
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

for (var i = 0; i < 9999; i++){
  var temp = [];
  temp.push(pad(i,4));
  temp.push('HK');
  temp = temp.join('.');
  stockIds.push(temp);
}

for (var i = 0; i < stockIds.length; i++){
    var url = 'http://ichart.finance.yahoo.com/table.csv?' + querystring.stringify({
      s: stockIds[i],
      d: time.split('-')[1] - 1,
      e: time.split('-')[2],
      f: time.split('-')[0],
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
        var lookup = 'setSymbolLookup(`' + fileName + '`=list(src="csv",format="%Y-%m-%d"))' + '\n';
        fs.writeFileSync(__dirname + '/dataset/' + fileName + '.csv', body);
        fs.appendFileSync(__dirname + '/lookupTable.r', lookup);
      } else {
        console.log('fail to download '+fileName);
      }
    });
  }
  console.log('Scraping...');
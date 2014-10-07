var fs = require('fs');
var querystring = require('querystring');
var request = require('request');
var cheerio = require('cheerio');
var moment = require("moment");
var time = moment().zone('+0800').format("YYYY-MM-DD");
var allStock = fs.readFileSync('../bluechip','utf8');
var lines = allStock.split('\n');
var stockIds = [];

for (var i = 0; i < lines.length; i++){
  stockIds.push(lines[i].split('_')[0]);
}

// ALL
// function pad(n, width, z) {
//   z = z || '0';
//   n = n + '';
//   return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
// }

// for (var i = 0; i < 9999; i++){
//   var temp = [];
//   temp.push(pad(i,4));
//   temp.push('HK');
//   temp = temp.join('.');
//   stockIds.push(temp);
// }

for (var i = 0; i < stockIds.length; i++){
    var stock = stockIds[i].split('.')[0];
    // var url = 'http://www.etnet.com.hk/www/tc/stocks/realtime/quote_ci_brief.php?code=' + stock;
    var url = 'http://www.aastocks.com/en/Stock/CompanyFundamental.aspx?CFType=8&symbol=' + stock;
    request({
      url: url
    }, function (err, res, body) {
      if (err) { return cb(err); }
      var fileName = res.request.path;
    //   fileName = fileName.split('=')[1].split('&')[0];
    fileName = fileName.split('=')[2];
      if (res.statusCode == 200){
          var $ = cheerio.load(body);
          var value = [];
          var header = [];
          var title = [];
          $('#H').each(function(j, elem) {
              header[j] = $(this).text();
          });
          $('.t_T1').each(function(j, elem) {
              title[j] = $(this).text();
          });
          $('#C').each(function(j, elem) {
              value[j] = $(this).text();
          });
          console.log(fileName);
          console.log(header.length + ',' + title.length + ',' + report.length);
        //   fs.writeFileSync(__dirname + '/info/' + fileName + '.csv', report);
      } else {
        console.log('fail to download '+fileName);
      }
    });
  }
  console.log('Scraping...');
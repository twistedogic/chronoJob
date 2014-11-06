var fs = require('fs');
var request = require('request');
var stockIds = fs.readdirSync(__dirname + '/dataset');
for(var i = 0; i < stockIds.length; i++){
    stockIds[i] = stockIds[i].split('.')[0] + '.' + stockIds[i].split('.')[1];
}
// for (var i = 0; i < stockIds.length; i++){
    var url = 'http://query.yahooapis.com/v1/public/yql?q=select+title%2Clink%2CpubDate%2Cdescription+from+rss+where+url+%3D+%22http%3A%2F%2Ffeeds.finance.yahoo.com%2Frss%2F2.0%2Fheadline%3Fs%3D' + stockIds[0] + '%26region%3DUS%26lang%3Den-US%22&format=json';
    request({
      url: url
    }, function (err, res, body) {
      if (err) { return cb(err); }
      if (res.statusCode == 200){
        console.log(body);
      } else {
        console.log('fail to download '+ stockIds[i]);
      }
    });
// }
console.log('Scraping...');
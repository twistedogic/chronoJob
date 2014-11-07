var fs = require('fs');
var YQL = require('yql');

var stockIds = fs.readdirSync(__dirname + '/dataset');
for(var i = 0; i < stockIds.length; i++){
    stockIds[i] = stockIds[i].split('.')[0] + '.' + stockIds[i].split('.')[1];
}
console.log(stockIds.length);
for (var i = 1; i < stockIds.length; i++){
    var query = new YQL('select pubDate,title,link,description from rss where url="http://finance.yahoo.com/rss/industry?s='+ stockIds[i] +'"');
    query.exec(function (error, response) {
        if(!error){
            console.log(response.query.results);
        }
        // Do something with results (response.query.results)
    });
}
console.log('Scraping...');
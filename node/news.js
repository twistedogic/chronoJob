var fs = require('fs');
var YQL = require('yql');

// var stockIds = fs.readdirSync(__dirname + '/dataset');
// for(var i = 0; i < stockIds.length; i++){
//     stockIds[i] = stockIds[i].split('.')[0] + '.' + stockIds[i].split('.')[1];
// }

var allStock = fs.readFileSync('../bluechip','utf8');
var lines = allStock.split('\n');
var stockIds = [];

for (var i = 0; i < lines.length; i++){
  stockIds.push(lines[i].split('_')[0]);
}

// console.log(stockIds.length);
// for (var i = 1; i < 2; i++){
//     var query = new YQL('select pubDate,title,link,description from rss where url="http://finance.yahoo.com/rss/industry?s='+ stockIds[i] +'"');
//     query.exec(function (error, response) {
//         if(!error){
//             var data = response.query.results.item;
//             for (var j = 0; j < data.length; j++){
//                 console.log(data[j].pubDate+'\t'+data[j].title);
//             }
//         }
//         // Do something with results (response.query.results)
//     });
// }
// console.log('Scraping...');
var base_aaurl = 'http://www.aastocks.com/en/stocks/news/aamm/';
var sessions = [
    'price-risen',
    'price-dropped',
    'block-traded',
    'price-fluctuated'
    ];
var xpath = '//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "h6", " " ))]';
for (var i = 1; i < sessions.length; i++){
    var query = new YQL('select * from html where url="' + base_aaurl + sessions[i] + '" and xpath=' + "'" + xpath + "'");
    query.exec(function (error, response) {
        if(!error){
            var data = response.query.results;
            for (var j = 0; j < data.div.length; j++){
                console.log(data.div[j].p+'\t'+data.a[j].title);
            }
        }
        // Do something with results (response.query.results)
    });
}

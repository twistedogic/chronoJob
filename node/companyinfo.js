var fs = require('fs');
var YQL = require('yql');
var moment = require('moment');
var crate = require('node-crate');
var crateIP = process.argv[2] || '10.0.0.125';
crate.connect(crateIP, 4200);
var allStock = fs.readFileSync('../bluechip','utf8');
var lines = allStock.split('\n');
var stockIds = [];

for (var i = 0; i < lines.length; i++){
  stockIds.push(lines[i].split('_')[0].split('.')[0]);
}

var stockIds = ['0001'];

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
                var json = {
                    "symbol":data.a[j].content.split('(')[1].split(')')[0],
                    "time":data.div[j].p,
                    "unix":moment(data.div[j].p).unix(),
                    "news":data.a[j].content            
                }
                crate.insert('news', json).success(console.log).error(console.error);
            }
        }
    });
}
for (var i = 0; i < stockIds.length;i++){
    var base_aaurl, query, xpath;
        base_aaurl = "http://www.aastocks.com/tc/stocks/analysis/stock-aafn/" + stockIds[i] + "/0/all/1";
        xpath = '//*[contains(concat( \" \", @class, \" \" ), concat( \" \", \"h6\", \" \" ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "pad4", " " ))]';
        query = new YQL("select * from html where url=\"" + base_aaurl + "\" and xpath=" + "'" + xpath + "'");
        query.exec(function(error, response) {
            if (!error) {
                var data = response.query.results;
                var time = [];
                var unix = [];
                for (var j = 1; j < data.div.length; j++){
                    var test = data.div[j].p;
                    test = test.split(' ');
                    var timestring = test[test.length - 1];
                    if (moment(timestring).isValid()){
                        var utime = moment(timestring).unix();
                        time.push(timestring);
                        unix.push(utime);
                    }
                }
                var symbol = data.div[0].p.split('(')[1].split(')')[0];
                console.log(symbol + '-tc');    
                for (var j = 0; j < data.a.length; j++){
                    var json = {    
                        "symbol":symbol,
                        "time":time[j],
                        "unix":unix[j],
                        "news":data.a[j].content.replace(/(,|\n|\m| )/g, '')                
                    }
                    crate.insert('news', json).success(console.log).error(console.error);
                }    
            }
        });
    
    var base_aaurl, query, xpath;
        base_aaurl = "http://www.aastocks.com/en/stocks/analysis/stock-aafn/" + stockIds[i] + "/0/all/1";
        xpath = '//*[contains(concat( \" \", @class, \" \" ), concat( \" \", \"h6\", \" \" ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "pad4", " " ))]';
        query = new YQL("select * from html where url=\"" + base_aaurl + "\" and xpath=" + "'" + xpath + "'");
        query.exec(function(error, response) {
            if (!error) {
                var data = response.query.results;
                var time = [];
                var unix = [];
                for (var j = 1; j < data.div.length; j++){
                    var test = data.div[j].p;
                    test = test.split(' ');
                    var timestring = test[test.length - 1];
                    if (moment(timestring).isValid()){
                        var utime = moment(timestring).unix();
                        time.push(timestring);
                        unix.push(utime);
                    }
                }
                var symbol = data.div[0].p.split('(')[1].split(')')[0];
                console.log(symbol + '-en');    
                for (var j = 0; j < data.a.length; j++){ 
                    var json = {      
                        "symbol":symbol,
                        "time":time[j],
                        "unix":unix[j],
                        "news":data.a[j].content.replace(/(,|\n|\m| )/g, '')                
                    }
                    crate.insert('news', json).success(console.log).error(console.error);
                }    
            }
        });
}

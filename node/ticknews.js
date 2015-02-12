var fs = require('fs');
var YQL = require('yql');
var moment = require('moment');
var cheerio = require('cheerio');
var request = require('request');
var md5 = require('MD5');

var stockIds = '00001';
var base_aaurl, query, xpath;
base_aaurl = "http://www.aastocks.com/tc/stocks/analysis/stock-aafn/" + stockIds + "/0/all/1";
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
        var symbol = symbol.split('.')[0];
        console.log(symbol + '-tc');    
        for (var j = 0; j < data.a.length; j++){
            var redirect = data.a[j].href;
            urlCheck = redirect.indexOf('http');
            if (urlCheck > -1){
            	var json = {    
            	    "symbol":symbol,
            	    "time":time[j],
            	    "data":{
            	        "unix":unix[j],
            	        "heading":data.a[j].content.replace(/(,|\n|\m| )/g, ''),
            	        "news": redirect
            	    }
            	}
                console.log('pdf');
            } else {
                // console.log(redirect);
                request('http://www.aastocks.com' + redirect,function(err,res,body){
                    var symbol = res.req.path;
                	$ = cheerio.load(body);
                	symbol = symbol.split('/stock-aafn-content/')[1].split('/')[0];
                	var heading = $('#lblSTitle').text();
                	var time = $('#spanDateTime').text();
                	var news = $('p').text();
                	var unixt = moment(time).unix();
                	console.log(md5(heading + time));
                	console.log(heading);
                // 	console.log(symbol + '\n' + heading + '\n' + time + '\n' + news);
                })
            }
            // request()
            // console.log(json);
        }    
    }
});
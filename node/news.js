var fs = require('fs');
var YQL = require('yql');
var moment = require('moment');
var cheerio = require('cheerio');
var request = require('request');
var md5 = require('MD5');

var fileUrl = process.argv[3] || 'https://raw.githubusercontent.com/twistedogic/chronoJob/master/indList'

request(fileUrl,function(err,res,body){
    if (!err){
        fs.writeFileSync(__dirname + '/target', body);
    }
});

setTimeout(function(){
	var industList = fs.readFileSync(__dirname + '/target','utf8');
	var lines = industList.split('\n');
	var industry = [];

	for (var i = 0; i < lines.length; i++){
	  industry.push(lines[i].split('_')[0]);
	}

	var base_aaurl = [
		'http://www.aastocks.com/en',
		'http://www.aastocks.com/tc'
		];
	var news = [
		'/stocks/news/aafn/top-news',
		'/stocks/news/aafn/popular-news',
		'/stocks/news/aafn/latest-news',
		'/stocks/news/aafn/research-report',
		'/stocks/news/aafn-company-news',
		'/stocks/news/aafn/result-announcement',
		'/stocks/news/aafn/economic-data',
		'/stocks/news/aafn/ipo-news',
		'/stocks/news/aafn/property',
		'/stocks/news/aafn/world-markets',
		'/stocks/news/aafn/china-policy',
		'/stocks/news/aafn/warrants-news',
		'/stocks/news/aafn/analysts-views',
		'/stocks/news/aafn/market-intelligence',
		'/stocks/news/aafn/technical-analysis',
		'/stocks/analysis/china-hot-topic.aspx',
		'/stocks/analysis/china-hot-topic.aspx?catg=3',
		'/stocks/analysis/china-hot-topic.aspx?catg=2',
		'/stocks/analysis/china-hot-topic.aspx?catg=1',
		'/stocks/news/aamm/price-risen',
	    '/stocks/news/aamm/price-dropped',
	    '/stocks/news/aamm/block-traded',
	    '/stocks/news/aamm/price-fluctuated'
		];
	var xpath = [
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "h6", " " ))]',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "h6", " " ))]',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "h6", " " ))]',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "h6", " " ))]',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "h6", " " ))]',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "h6", " " ))]',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "h6", " " ))]',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "h6", " " ))]',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "h6", " " ))]',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "h6", " " ))]',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "h6", " " ))]',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "h6", " " ))]',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "h6", " " ))]',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "h6", " " ))]',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "h6", " " ))]',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[(@id = "dzh-search")]//a',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[(@id = "dzh-search")]//a',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[(@id = "dzh-search")]//a',
    	'//*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[(@id = "dzh-search")]//a',
    	'//*[contains(concat( \" \", @class, \" \" ), concat( \" \", \"h6\", \" \" ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "pad4", " " ))]',
    	'//*[contains(concat( \" \", @class, \" \" ), concat( \" \", \"h6\", \" \" ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "pad4", " " ))]',
    	'//*[contains(concat( \" \", @class, \" \" ), concat( \" \", \"h6\", \" \" ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "pad4", " " ))]',
    	'//*[contains(concat( \" \", @class, \" \" ), concat( \" \", \"h6\", \" \" ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "newstime2", " " ))] | //*[contains(concat( " ", @class, " " ), concat( " ", "pad4", " " ))]'
    	];
	for (var i = base_aaurl.length - 1; i >= 0; i--) {
		for (var j = news.length - 1; j >= 0; j--) {
			var url = base_aaurl[i] + news[j];
			console.log(url);
			query = new YQL("select * from html where url=\"" + url + "\" and xpath=" + "'" + xpath[j] + "'");
			query.exec(function(error, response) {
			    if (!error) {
			        var data = response.query.results;
			        var time = [];
			        var unix = [];
			        for (var m = 1; m < data.div.length; m++){
			            var test = data.div[m].p;
			            test = test.split(' ');
			            var timestring = test[test.length - 1];
			            if (moment(timestring).isValid()){
			                var utime = moment(timestring).unix();
			                time.push(timestring);
			                unix.push(utime);
			            }
			        }
			        for (var m = 0; m < data.a.length; m++){
			            var redirect = data.a[m].href;
			            urlCheck = redirect.indexOf('http');
			            if (urlCheck > -1){
			                var json = {    
			                    "symbol":symbol,
			                    "time":time[m],
			                    "unix":unix[m],
			                    "heading":data.a[m].content.replace(/(,|\n|\m| )/g, ''),
			                    "news": redirect
			                }
			                console.log('pdf');
			            } else {
			                // console.log(redirect);
			                request('http://www.aastocks.com' + redirect,function(err,res,body){
			                    var symbol = res.req.path;
			                    $ = cheerio.load(body);
			                    var heading = $('#lblSTitle').text();
			                    var time = $('#spanDateTime').text();
			                    var news = $('p').text();
			                    var unixt = moment(time).unix();
			                    console.log(md5(heading + time));
			                    console.log(heading);
			                //  console.log(symbol + '\n' + heading + '\n' + time + '\n' + news);
			                })
			            }
			            // request()
			            // console.log(json);
			        }    
			    }
			});
		};

// 		for (var l = industry.length - 1; l >= 0; l--) {
// 			var url = base_aaurl[i] + '/stocks/news/aafn-ind/' + industry[l];
// 			console.log(url);
// 			query = new YQL("select * from html where url=\"" + url + "\" and xpath=" + "'" + xpath[0] + "'");
// 			query.exec(function(error, response) {
// 			    if (!error) {
// 			        var data = response.query.results;
// 			        var time = [];
// 			        var unix = [];
// 			        for (var n = 1; n < data.div.length; n++){
// 			            var test = data.div[n].p;
// 			            test = test.split(' ');
// 			            var timestring = test[test.length - 1];
// 			            if (moment(timestring).isValid()){
// 			                var utime = moment(timestring).unix();
// 			                time.push(timestring);
// 			                unix.push(utime);
// 			            }
// 			        }
// 			        for (var n = 0; n < data.a.length; n++){
// 			            var redirect = data.a[n].href;
// 			            urlCheck = redirect.indexOf('http');
// 			            if (urlCheck > -1){
// 			                var json = {    
// 			                    "symbol":symbol,
// 			                    "time":time[n],
// 			                    "unix":unix[n],
// 			                    "heading":data.a[n].content.replace(/(,|\n|\m| )/g, ''),
// 			                    "news": redirect
// 			                }
// 			                console.log('pdf');
// 			            } else {
// 			                // console.log(redirect);
// 			                request('http://www.aastocks.com' + redirect,function(err,res,body){
// 			                    var symbol = res.req.path;
// 			                    $ = cheerio.load(body);
// 			                    var heading = $('#lblSTitle').text();
// 			                    var time = $('#spanDateTime').text();
// 			                    var news = $('p').text();
// 			                    var unixt = moment(time).unix();
// 			                    console.log(md5(heading + time));
// 			                    console.log(heading);
// 			                //  console.log(symbol + '\n' + heading + '\n' + time + '\n' + news);
// 			                })
// 			            }
// 			            // request()
// 			            // console.log(json);
// 			        }    
// 			    }
// 			});
// 		};
	};
},10000);

var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var options = {
    url: 'http://www.etnet.com.hk/www/eng/stocks/realtime/quote_super.php?code=700',
    headers: {
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36'
    }
};
request(options,function(err,res,body){
    if(!err){
        $ = cheerio.load(body);
        var quote = $('.number').text();
        var stock = $('.stockName').children().first().text();
        console.log(stock);
    }
})
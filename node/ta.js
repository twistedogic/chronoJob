var talib = require('talib');
var async = require('async');
var _ = require('lodash');
var request = require('request');
var fs = require('fs');

var list = [
    '0001','0002','0003','0004'
];
var urilist = [];
for (var i = 0; i < list.length; i++) {
    var url = {
        url:{
            url:'https://api.investtab.com/api/quote/0' + list[i] + ':HK/historical-prices'
        },
        symbol:list[i]
    };
    urilist.push(url);
}
// request + talib
function getData(input,callback){
    var url = input.url;
    var symbol = input.symbol;
	request(url,function(e,r,b){
		if(e){
			callback(e);
		} else {
			var data = JSON.parse(b);
            if(data.s == "ok"){
                data.c = data.c.reverse();
                data.o = data.o.reverse();
                data.h = data.h.reverse();
                data.l = data.l.reverse();
                data.v = data.v.reverse();
                data.t = data.t.reverse();
                var json = {
                    date:data.t,
                    close:data.c,
                    open:data.o,
                    high:data.h,
                    low:data.l,
                    volume:data.v,
                    symbol:symbol,
                    methods:[
                    {
					    methodName:"SMA250",
					    cmd:{
					        name: "SMA",
					        startIdx: 0,
					        endIdx: data.c.length - 1,
					        inReal: data.c,
					        optInTimePeriod: 250
					    }
					},
					{
					    methodName:"SMA100",
					    cmd:{
					        name: "SMA",
					        startIdx: 0,
					        endIdx: data.c.length - 1,
					        inReal: data.c,
					        optInTimePeriod: 100
					    }
					},
					{
					    methodName:"SMA50",
					    cmd:{
					        name: "SMA",
					        startIdx: 0,
					        endIdx: data.c.length - 1,
					        inReal: data.c,
					        optInTimePeriod: 50
					    }
					},
					{
					    methodName:"SMA20",
					    cmd:{
					        name: "SMA",
					        startIdx: 0,
					        endIdx: data.c.length - 1,
					        inReal: data.c,
					        optInTimePeriod: 20
					    }
					},
					{
					    methodName:"SMA10",
					    cmd:{
					        name: "SMA",
					        startIdx: 0,
					        endIdx: data.c.length - 1,
					        inReal: data.c,
					        optInTimePeriod: 10
					    }
					},
					{
					    methodName:"MACD",
					    cmd:{
					        name: "MACD",
					        startIdx: 0,
					        endIdx: data.c.length - 1,
					        inReal: data.c,
					        optInFastPeriod: 12,
					        optInSlowPeriod: 26,
					        optInSignalPeriod: 9
					    }
					},
					{
					    methodName:"STOCH",
					    cmd:{
					        name: "STOCH",
					        startIdx: 0,
					        endIdx: data.c.length - 1,
					        high: data.h,
					        low: data.l,
					        close: data.c,
					        optInFastK_Period: 5,
					        optInSlowK_Period: 3,
					        optInSlowK_MAType: 0,
					        optInSlowD_Period: 3,
					        optInSlowD_MAType: 0
					    }
					},
					{
					    methodName:"RSI",
					    cmd:{
					        name: "RSI",
					        startIdx: 0,
					        endIdx: data.c.length - 1,
					        inReal: data.c,
					        optInTimePeriod: 14
					    }
					},
					{
					    methodName:"ROCP",
					    cmd:{
					        name: "ROCP",
					        startIdx: 0,
					        endIdx: data.c.length - 1,
					        inReal: data.c,
					        optInTimePeriod: 10
					    }
					},
					{
					    methodName:"STDDEV",
					    cmd:{
					        name: "STDDEV",
					        startIdx: 0,
					        endIdx: data.c.length - 1,
					        inReal: data.c,
					        optInTimePeriod: 10,
					        optInNbDev:1
					    }
					},
					{
					    methodName:"MINMAX",
					    cmd:{
					        name: "MINMAX",
					        startIdx: 0,
					        endIdx: data.c.length - 1,
					        inReal: data.c,
					        optInTimePeriod: 30
					    }
					},
					{
					    methodName:"ATR",
					    cmd:{
					        name: "ATR",
					        startIdx: 0,
					        endIdx: data.c.length - 1,
					        high: data.h,
					        low: data.l,
					        close: data.c,
					        optInTimePeriod: 14
					    }
					},
					{
					    methodName:"BBANDS",
					    cmd:{
					        name: "BBANDS",
					        startIdx: 0,
					        endIdx: data.c.length - 1,
					        inReal: data.c,
					        optInTimePeriod: 5,
					        optInNbDevUp: 2,
					        optInNbDevDn: 2,
					        optInMAType: 0
					    }
					}
                    ]
                };
        		callback(null,json);
            } else {
            	callback('Not ok');
            }
		}
	});
}
function technical(input,callback){
    var cmd = input.cmd;
    var name = input.methodName;
    talib.execute(input.cmd,function(result){
        var data = result.result;
        var output = {
            taName:name,
            data: data
        };
        callback(null,output);
    })
}
function symbolWrapper(input,callback){
    var date = input.date;
    var symbol = input.symbol;
    var methods = input.methods;
    var close = input.close;
    var low = input.low;
    var high = input.high;
    var open = input.open;
    var volume = input.volume;
    async.map(methods, technical, function(err,result){
        var output = {
            symbol:symbol,
            // date: date,
            // data:{
            //     close:close,
            //     open:open,
            //     low:low,
            //     high:high,
            //     volume:volume
            // },
            result:result
        }
        callback(null,output);
    })
}

async.map(urilist,getData,function(err,result){
	if(err){
		console.log(err);
	} else {
        async.map(result,symbolWrapper,function(e,r){
            if(e){
                console.log(e);
            } else {
                var data = r;
                for (var i = 0; i < r.length; i++) {
                    var json = {};
                    var results = data[i].result;
                    for (var j = 0; j < results.length; j++) {
                        var keys = Object.keys(results[j].data);
                        var values = results[j].data;
                        for (var m = 0; m < keys.length; m++) {
                            json[results[j].taName + keys[m]] = values[keys[m]].slice(0,10);
                        }
                    }
                    data[i].result = json;
                }
                fs.writeFileSync(__dirname + '/test.json', JSON.stringify(data));
            }
        })
	}
})
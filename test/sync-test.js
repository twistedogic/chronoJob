var assert = require("assert");
var zp = require('../lib/util/zp.js');
var createTarget = require('../lib/util/createTarget.js');
var flatten = require('../lib/util/flatten.js');
var toCSV = require('../lib/util/toCSV.js');
var toJSON = require('../lib/util/toJSON.js');
var COT = require('../lib/util/createOptionTarget.js');
describe("utility",function(){
    it("input validation",function(){
        assert.equal("00001:HK", zp("1"));
        assert.equal("00001:HK", zp("01"));
        assert.equal("00001:HK", zp("0001.HK"));
        assert.equal("00001:HK", zp("asdwadwawdwa1:aaa"));
        assert.equal("00001:HK", zp("00001:HK"));
        assert.equal("06823:HK", zp("682aaa3:HK"));
    });
    it("create target url",function(){
        assert.equal("https://api.investtab.com/api/quote/00001:HK/info", createTarget(["1"],"info")[0]);
    });
    it("create option url",function(){
        var expect = {
            soe:[
                "http://www.hkex.com.hk/eng/sorc/market_data/stock_options_exercised.aspx?action=ajax&type=getCSV&ucode=00001&date_from=2012%2F1%2F1&date_to=2015%2F8%2F10&page=3",
                "http://www.hkex.com.hk/eng/sorc/market_data/stock_options_exercised.aspx?action=ajax&type=getCSV&ucode=00001&date_from=2012%2F1%2F1&date_to=2015%2F8%2F10&page=2",
                "http://www.hkex.com.hk/eng/sorc/market_data/stock_options_exercised.aspx?action=ajax&type=getCSV&ucode=00001&date_from=2012%2F1%2F1&date_to=2015%2F8%2F10&page=1"
            ],
            pcr:[
                "http://www.hkex.com.hk/eng/sorc/market_data/statistics_putcall_ratio.aspx?action=ajax&type=getCSV&ucode=00001&date_from=2012%2F1%2F1&date_to=2015%2F8%2F10&page=3",
                "http://www.hkex.com.hk/eng/sorc/market_data/statistics_putcall_ratio.aspx?action=ajax&type=getCSV&ucode=00001&date_from=2012%2F1%2F1&date_to=2015%2F8%2F10&page=2",
                "http://www.hkex.com.hk/eng/sorc/market_data/statistics_putcall_ratio.aspx?action=ajax&type=getCSV&ucode=00001&date_from=2012%2F1%2F1&date_to=2015%2F8%2F10&page=1"
            ]
        };
        assert.equal(JSON.stringify(expect),JSON.stringify(COT({
            symbol:["1"],
            date:["20120101","20150810"],
            page:3
        })));
    });
    it("flatten json to single level",function(){
        var testObj = {
            symbol: "00688:HK",
            book_close_period: "",
            period: "Special",
            period_loc: {
                sc: "特别报告",
                en: "Special",
                tc: "特別報告"
            },
            announce_date: "2015-07-06T00:00:00",
            as_of_date: "2015-12-31T00:00:00",
            particular_loc: "其他派送: 實物分派中海物業集團有限公司股份(細節有待公佈)",
            pay_date: null,
            particular: "Other Distribution: Distribution in specie for China Overseas Property Holdings Limited shares (Details to be announced)",
            ca_type: "OD",
            ex_date: null,
            id: 57141,
            record_date: null
        };
        var expectedOutput = {
            symbol: "00688:HK",
            book_close_period: "",
            period: "Special",
            period_loc_sc: "特别报告",
            period_loc_en: "Special",
            period_loc_tc: "特別報告",
            announce_date: "2015-07-06T00:00:00",
            as_of_date: "2015-12-31T00:00:00",
            particular_loc: "其他派送: 實物分派中海物業集團有限公司股份(細節有待公佈)",
            pay_date: null,
            particular: "Other Distribution: Distribution in specie for China Overseas Property Holdings Limited shares (Details to be announced)",
            ca_type: "OD",
            ex_date: null,
            id: 57141,
            record_date: null
        };
        assert.equal(JSON.stringify(expectedOutput), JSON.stringify(flatten(testObj)));
    })
    it("json to csv",function(){
        var json = [{
            a:2,b:"what",c:1000
        },{
            a:1,c:"OK",d:1000
        }];
        var csv = "a,b,c,d" + "\n" + "2,what,1000," + "\n" + "1,,OK,1000";
        assert.equal(csv, toCSV(json));
    });
    it("csv to json",function(){
        var json = [{
            a:2,b:"what",c:1000,d:null
        },{
            a:1,b:null,c:"OK",d:1000
        }];
        var csv = "a,b,c,d" + "\n" + "2,what,1000," + "\n" + "1,,OK,1000";
        assert.equal(JSON.stringify(json), JSON.stringify(toJSON(csv)));
    });
})
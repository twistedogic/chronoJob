var _ = require('lodash');
var sector = require('../lib/fundamental/sector.js');
var fundamental = require('../lib/fundamental/fundamental.js');
var options = require('../lib/options/options.js');
var daily = require('../lib/options/daily.js');
var file = require('../lib/output.js');
describe("Scrape Data",function(){
    it("sector, industry, sub_industry",function(done){
        sector(["00005","2388"],function(err,res){
            if(res.sector){
                var key = _.keys(res);
                if(_.isArray(key) && key.length == 3){
                    done();
                }
            }
        })
    });
    it("fundamental info",function(done){
        this.timeout(10000);
        fundamental(["00005","2388"],function(err,res){
            if(_.isObject(res)){
                var key = _.keys(res);
                if(_.isArray(key) && key.length == 7){
                    done();
                }
            }
        })
    });
    it("options report",function(done){
        this.timeout(10000);
        options({
            symbol:["1"],
            date:["20140101","20150810"],
            page:3
        },function(err,res){
            if(_.keys(res).length == 2){
                done();
            }
        })
    });
    it("daily options report",function(done){
        daily("150810",function(err,res){
            if(res == "done"){
                done();
            }
        })
    });
})

describe("Output data",function(){
    it("toCSV",function(done){
        file(["00005","2388"],"csv",function(err,res){
            if(_.isArray(res.filepath)){
                done();
            }
        })
    });
    it("toJSON",function(done){
        file(["00005","2388"],"json",function(err,res){
            if(_.isArray(res.filepath)){
                done();
            }
        })
    });
})
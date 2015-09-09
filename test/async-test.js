var _ = require('lodash');
var assert = require('assert');
var sector = require('../lib/fundamental/sector.js');
var fundamental = require('../lib/fundamental/fundamental.js');
var options = require('../lib/options/options.js');
var daily = require('../lib/options/daily.js');
var config = require('../conf/config.js');
describe("Scrape Data",function(){
    it("sector, industry, sub_industry",function(done){
        this.timeout(5000);
        assert.doesNotThrow(function(){
            sector(["00005","2388"],function(err,res){
                if(_.isObject(res)){
                    assert.deepEqual(_.keys(res[0]),['_id','name','sector','industry','sub_industry']);
                    done();
                }
            })
        })
    });
    it("fundamental info",function(done){
        this.timeout(5000);
        assert.doesNotThrow(function(){
            fundamental(["00005","2388"],function(err,res){
                if(_.isObject(res)){
                    assert.deepEqual(_.keys(res),config.report);
                    done();
                }
            })
        });
    });
    it("options report",function(done){
        this.timeout(10000);
        options({
            symbol:["1"],
            date:["20140101","20150810"],
            page:3
        },function(err,res){
            if(_.isObject(res.soe[0]) && _.isObject(res.pcr[0])){
                done();
            }
        })
    });
    it("daily options report",function(done){
        this.timeout(10000);
        daily(["150810","150811"],function(err,res){
            if(_.isObject(res.dtop[0]) && _.isObject(res.rp[0]) && _.isObject(res.dqe[0])){
                done();
            }
        })
    });
})
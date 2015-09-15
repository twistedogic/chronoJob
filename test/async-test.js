var _ = require('lodash');
var assert = require('assert');
var sector = require('../lib/fundamental/sector.js');
var fundamental = require('../lib/fundamental/fundamental.js');
var options = require('../lib/options/options.js');
var daily = require('../lib/options/daily.js');
var config = require('../conf/config.js');
var ta = require('../lib/technical/ta.js');
describe("Scrape Data",function(){
    it("sector, industry, sub_industry",function(done){
        this.timeout(3000);
        assert.doesNotThrow(function(){
            sector(["00005","2388"],function(err,res){
                if(_.isObject(res)){
                    assert.deepEqual(_.keys(res.sector[0]),['_id','name','sector','industry','sub_industry']);
                    done();
                }
            })
        })
    });
    it("fundamental info",function(done){
        this.timeout(3000);
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
        this.timeout(3000);
        options({
            symbol:["1"],
            date:["20140101","20150810"]
        },function(err,res){
            if(_.isObject(res.soe) && _.isObject(res.pcr)){
                done();
            }
        })
    });
    it("daily options report",function(done){
        this.timeout(3000);
        assert.doesNotThrow(function(){
            daily(["150810","150811"],function(err,res){
                if(_.isObject(res)){
                    _.each(_.keys(res),function(m){
                        assert.deepEqual(_.keys(res[m][0]),['_id','data']);
                    })
                    done();
                }
            })
        })
    });
    it("daily techincal report",function(done){
        this.timeout(3000);
        assert.doesNotThrow(function(){
            ta(["1","6823"],function(err,res){
                if(_.isObject(res)){
                    _.each(res,function(m){
                        assert.deepEqual(_.keys(m),['_id','data']);
                    })
                    done();
                }
            })
        })
    });
})
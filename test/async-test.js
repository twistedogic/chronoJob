var _ = require('lodash');
var assert = require('assert');
var mongoose = require('mongoose');
var sector = require('../lib/fundamental/sector.js');
var fundamental = require('../lib/fundamental/fundamental.js');
var options = require('../lib/options/options.js');
var daily = require('../lib/options/daily.js');
var config = require('../conf/config.js');
var ta = require('../lib/technical/ta.js');
var mongoWrite = require('../lib/util/mongoWrite.js');
var cloudantWrite = require('../lib/util/cloudantWrite.js');
var Cloudant = require('cloudant');
var username = config.cloudant.username;
var password = config.cloudant.password;
var cloudant = Cloudant({account:username, password:password});

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
                    assert.deepEqual(_.keys(res[0]),_.keys(res[_.random(res.length)]));
                    done();
                }
            })
        })
    });
})

describe("Save Data to mongodb",function(){
    before(function (done) {   
        mongoose.connect('mongodb://' + config.mongo_ip + ':27017/' + config.db_name, function(){
            mongoose.connection.db.dropDatabase(function(){
                done();
            })    
        })
    })
    it("write to mongo",function(done){
        this.timeout(3000);
        assert.doesNotThrow(function(){
            var input = {
                collection_name:[{
                    _id: 1,
                    name:"tom",
                    gender:"m"
                },{
                    _id: 2,
                    name:"mary",
                    gender:"f"
                }]
            };
            mongoWrite(input,function(err,res){
                if(_.isObject(res)){
                    assert.equal(input[_.keys(input)[0]].length,res.n);
                    done();
                }
            })
        })
    });
    after(function (done) {   
        mongoose.connect('mongodb://' + config.mongo_ip + ':27017/' + config.db_name, function(){
            mongoose.connection.db.dropDatabase(function(){
                done();
            })    
        })
    })
})

describe("Save Data to Cloudant",function(){
    // before(function (done) {   
    //     cloudant.db.destroy('test', function(err){
    //         done();
    //     });
    // })
    it("write to cloudant",function(done){
        this.timeout(3000);
        assert.doesNotThrow(function(){
            var input = {
                test:[{
                    _id: 1,
                    name:"tom",
                    gender:"m"
                },{
                    _id: 2,
                    name:"mary",
                    gender:"f"
                }]
            };
            cloudantWrite(input,function(err,res){
                assert.equal(input[_.keys(input)[0]].length,res);
                done();
            })
        })
    });
    after(function (done) {   
        cloudant.db.destroy('test', function(err){
            if(!err){
                done();
            }
        });
    })
})

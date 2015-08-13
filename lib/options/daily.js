var exec = require('child_process').execFile;
var fs = require('fs');
var async = require('async');
var _ = require('lodash');
var config = require('../../conf/config.js');
var toJSON = require('../util/toJSON.js');

function cleanUp(input,type,date){
    var filename = _.filter(input,function(n){
        return (n.indexOf(date) > -1)
    });
    filename = _.filter(filename,function(n){
        return (n.indexOf(type) > -1)
    });
    var header = config.dtop_header;
    var date = filename.toString().substr(0,8);
    if(type == "rp"){
        header = config.rp_header;
    }
    if(type == 'dqe'){
        header = config.dqe_header;
        date = "20" + filename.toString().substr(3,9);
    }
    header.unshift("REPORT_DATE");
    var data = fs.readFileSync(__dirname + "/../../data/" + filename, 'utf8');
    data = data.split("\r\n");
    var rows = [];
    for (var i = 0; i < data.length; i++) {
        var tmp = data[i].split(',');
        tmp.unshift(date);
        rows.push(tmp);
    }
    var standardLength = header.length;
    var clean_rows = _.filter(rows,function(n){
        return n.length == standardLength;
    })
    clean_rows.unshift(header);
    for (var i = 0; i < clean_rows.length; i++) {
        clean_rows[i] = clean_rows[i].join(',');
    }
    return toJSON(clean_rows.join('\n'));
}

function readFile(input,callback){
    exec(__dirname + '/report.sh',[input],function(err,stdout,stderr){
        if(err){
            callback(err);
        } else {
            fs.readdir(__dirname + "/../../data/",function(err,files){
                if(err){
                    callback(err);
                } else {
                    var data = {
                        dtop: cleanUp(files,'dtop',input),
                        rp: cleanUp(files,'rp',input),
                        dqe: cleanUp(files,'dqe',input)
                    };
                    callback(null,data)
                }
            });
        }
    })
}

module.exports = function(input,callback){
    async.map(input,readFile,function(err,res){
        if(err){
            callback(err);
        } else {
            var rp = _.map(res,'rp');
            var dtop = _.map(res,'dtop');
            var dqe = _.map(res,'dqe');
            var data = {
                rp: _.flatten(rp),
                dtop: _.flatten(dtop),
                dqe: _.flatten(dqe)
            };
            callback(null,data)
        }
    })
}
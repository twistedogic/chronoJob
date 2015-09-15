var _ = require('lodash');
var config = require('../../conf/config.js').options.daily;
var request = require('request');
var AdmZip = require('adm-zip');
var async = require('async');

function setTarget(input){
    var url = [];
    _.each(input,function(m){
        var file = m + ".zip";
        _.each(_.keys(config),function(n){
            url.push({
                url: config[n].url + file,
                type: n
            });
        });
    })
    return url;
}

function getData(input,callback){
    var data = [], dataLen = 0;
    request(input.url)
    .on('data', function(chunk) {
        data.push(chunk);
        dataLen += chunk.length;
    }).on('end', function() {
        var buf = new Buffer(dataLen);
        for (var i=0, len = data.length, pos = 0; i < len; i++) { 
            data[i].copy(buf, pos); 
            pos += data[i].length; 
        } 
        var zip = new AdmZip(buf);
        var zipEntries = zip.getEntries();
        var output = [];
        for (var i = 0; i < zipEntries.length; i++) {
            var ext = zipEntries[i].name
            if(ext.split('.')[1] !== 'rpt'){
                if(ext.indexOf('_f.raw') < 0){
                    output.push({
                        _id: ext.split('.')[0],
                        type:input.type + '_raw',
                        data:zip.readAsText(zipEntries[i])
                    })
                }
            }
        }
        callback(null,output);
    });
}

module.exports = function(input,callback){
    var url = setTarget(input);
    async.map(url,getData,function(err,res){
        if(err){
            callback(err)
        } else {
            var data = _.flatten(res);
            var output = {};
            _.each(data,function(m){
                output[m.type] = [];
            })
            _.each(data,function(m){
                output[m.type].push({
                    _id:m._id,
                    data:m.data
                })
            })
            callback(null,output);
        }
    })
}


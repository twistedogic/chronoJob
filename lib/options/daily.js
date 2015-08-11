var exec = require('child_process').execFile;
var fs = require('fs');
var async = require('async');
var _ = require('lodash');

function cleanUp(input,type){
    var filename = _.filter(input,function(n){
        return (n.indexOf(type) > -1)
    })
    var data = fs.readFileSync(__dirname + "/../../data/" + filename, 'utf8');
    data = data.split("\r\n");
    var rows = [];
    for (var i = 0; i < data.length; i++) {
        var tmp = data[i].split(',');
        tmp.unshift(tmp.length);
        rows.push(tmp);
    }
    var count = _.countBy(rows,function(n){
        return n[0]
    });
    return max
}
function cleanUpDqe(input){
    
}
function cleanUpDtop(input){
    
}
exec(__dirname + '/report.sh',["150810"],function(err,stdout,stderr){
    if(err){
        console.log(err);
    } else {
        fs.readdir(__dirname + "/../../data/",function(err,files){
            console.log(cleanUp(files,'rp'));
        });
    }
})
var target = require('../../conf/symbols.js');
var exec = require('child_process').execFile;
var fs = require('fs');
exec(__dirname + '/report.sh',["150810"],function(err,stdout,stderr){
    if(err){
        console.log(err);
    } else {
        console.log(stdout);
    }
})
var _ = require('lodash');
module.exports = function (input){
    var csv = input.split('\n');
    var json = [];
    var header = csv[0].split(',');
    for (var i = 1; i < csv.length; i++) {
        var tmp = {};
        var value = csv[i].split(',');
        for (var j = 0; j < header.length; j++) {
            if(Number(value[j])){
                tmp[header[j]] = Number(value[j]);
            } else {
                if(value[j] === ""){
                    tmp[header[j]] = null;
                } else {
                    tmp[header[j]] = value[j];
                }
            }
        }
        json.push(tmp);
    }
    return json
}
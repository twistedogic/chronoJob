var config = require('../../conf/config.js');
var zp = require('./zp.js');
module.exports = function(input,target){
    var output = [];
    for (var i = 0; i < input.length; i++) {
        output.push(config.base_url + zp(input[i]) + "/" + target);
    }
    return output
}
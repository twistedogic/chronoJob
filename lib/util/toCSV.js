var _ = require('lodash');
module.exports = function (input){
    var header = [];
    _.forEach(input,function(n){
        header.push(_.keys(n));
    })
    header = _.uniq(_.flatten(header));
    var data = [header];
    _.forEach(input,function(n){
        var rows = [];
        _.forEach(header,function(m){
            rows.push(n[m]);
        })
        data.push(rows);
    })
    return data.join("\n");
}
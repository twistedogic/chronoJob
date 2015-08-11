var config = require('../../conf/config.js');
var _ = require('lodash');
var zp = require('./zp.js');
var qs = require('querystring');
module.exports = function(input){
    var soe = [];
    var pcr = [];
    var queryTemplate = config.option_query;
    var soeURL = config.option_report.soe;
    var pcrURL = config.option_report.pcr;
    if(input.date.length != 2){
        return undefined
    } else {
        var date1 = input.date[0];
        var date2 = input.date[1];
        var formatdate1 = date1.substring(0, 4) + '/' + Number(date1.substring(4, 6)) + '/' + Number(date1.substring(6, 10));
        var formatdate2 = date2.substring(0, 4) + '/' + Number(date2.substring(4, 6)) + '/' + Number(date2.substring(6, 10));
        if(Number(date1) > Number(date2)){
            queryTemplate.date_form = formatdate2;
            queryTemplate.date_to = formatdate1;
        } else {
            queryTemplate.date_form = formatdate1;
            queryTemplate.date_to = formatdate2;
        }
    }
    _.forEach(input.symbol,function(n){
        var query = queryTemplate;
        query.ucode = zp(n).split(":")[0];
        for (var i = input.page; i > 0; i--) {
            query.page = i;
            soe.push(soeURL + "?" + qs.stringify(query) + "&ordering=");
            pcr.push(pcrURL + "?" + qs.stringify(query));
        }
    })
    return {
        soe:soe,
        pcr:pcr
    }
}
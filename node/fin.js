var fs = require('fs');
var YQL = require('yql');
var allStock = fs.readFileSync('../bluechip','utf8');
var lines = allStock.split('\n');
var stockIds = [];

for (var i = 0; i < lines.length; i++){
  stockIds.push(lines[i].split('_')[0].split('.')[0]);
}

var baseurl = [
    'http://www.aastocks.com/en/Stock/CompanyFundamental.aspx?CFType=4&symbol=',
    'http://www.aastocks.com/en/Stock/CompanyFundamental.aspx?CFType=5&symbol=',
    'http://www.aastocks.com/en/Stock/CompanyFundamental.aspx?CFType=6&symbol=',
    'http://www.aastocks.com/en/Stock/CompanyFundamental.aspx?CFType=7&symbol=',
    'http://www.aastocks.com/en/Stock/CompanyFundamental.aspx?CFType=8&symbol='
    ];
var css = [
    '//*[(@id = "FR")]//td',
    '//*[(@id = "PL")]//td',
    '//*[(@id = "CF")]//td',
    '//*[(@id = "BS")]//td',
    '//*[(@id = "ES")]//td'
    ];

for (var i = 0; i < stockIds.length; i++){    
    var stock = stockIds[i];
    for (var m = 0; m < baseurl.length; m++){
        var url = baseurl[m] + stock;
        var xpath = css[m] + '| //*[contains(concat( " ", @class, " " ), concat( " ", "font12a_white", " " ))]';
        var query = new YQL('select * from html where url="' + url + '" and xpath=' + "'" + xpath + "'");
        query.exec(function (error, response) {
            if(!error){
                var data = response.query.results.td;
                var symbol = response.query.results.a.content;
                var info = [];
                var year = 0;
                var head = 0;
                for (var j = 0; j < data.length; j++){
                    if (data[j].id == 'H'){
                        year++;
                    }
                    if (data[j].class == 't_H2'){
                        head++;
                    }
                    var colspan = JSON.stringify(data[j]).split('colspan');
                    if (colspan.length < 2){
                        var value = JSON.stringify(data[j]).split(':');
                        value = value[value.length - 1].replace(/(,|\}|"|\(|\)|%| |'|\/|  )/g, '');
                        info.push(value);
                    }
                }
                year = year / (head - year);
                var header = info.length/(year + 1);
                var csv = 'symbol,' + info[0];
                for (var l = 1; l < header; l++){
                    csv = csv + ',' + info[l*(year + 1)];
                }
                for (var k = 1; k < year + 1; k++){
                    var row = symbol + ',' +info[k];
                    for (var l = 1; l < header; l++){
                        row = row + ',' + info[k + l*(year + 1)];
                    }
                    csv = csv + '\n' + row;
                }
                fs.writeFileSync(__dirname + '/info/' + symbol.split('.')[0] + info[0] + '.csv',csv);
                console.log(csv);
            }
        });
    }
}
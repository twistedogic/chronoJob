var csv = require('csv-to-json');
var fs = require('fs');
var allStock = fs.readFileSync('../bluechip','utf8');
var lines = allStock.split('\n');
var stockIds = [];

for (var i = 0; i < lines.length; i++){
  stockIds.push(lines[i].split('_')[0]);
}

for (var i = 0; i < stockIds.length; i++){
    var stock = stockIds[i].split('.')[0];
    var line = [[],[],[],[],[],[]];
    for (var k = 4; k < 9; k++){
        var fileName = stock + '-' + k;
        var file = fs.readFileSync('info/'+fileName+'.csv','utf8');
        file = file.split('\n');
        var key = file[2];
        key = key.split(',');
        line[0].push(key);
        var value = file[3];
        value = value.split(',');
        var data = [];
        for (var j = 0; j < 5; j++){
            var temp = [];
          	for(var l = 0; l < value.length; l += 5){
          		var n = j + l;
          		temp.push(value[n]);
          	}
          	temp.join(',');
          	line[j + 1].push(temp);
        }
    }
    line[0].unshift('stockId');
    line[0].unshift('Year');
    var header = file[1];
    header = header.split(',');
    for (var k = 0; k < header.length; k++){
        line[k + 1].unshift(stock);
        line[k + 1].unshift(header[k]);
    }
    var data=[];
    for (var k = 0; k < line.length; k++){
        var temp = line[k];
        data[k] = temp.join(',');
    }
    var output = data[0];
    for (var k = 1; k < line.length; k++){
        output = output + '\n' + data[k];
    }
    fs.writeFileSync(__dirname + '/info/' + stock + '.csv', output);
}
var id = 0;
var bulk = {"index":{"_index":"companyinfo","_type":"finanical","_id":id}};
bulk = JSON.stringify(bulk);
for (var i = 0; i < stockIds.length; i++){
    var stock = stockIds[i].split('.')[0];
    var json = csv.parse('info/'+ stock + '.csv');
    for (var j = 0; j < json.length; j++){
        id++;
        bulk = bulk + '\n' + JSON.stringify(json[j]) + '\n' + JSON.stringify({"index":{"_index":"companyinfo","_type":"finanical","_id":id}});
    }
}
fs.writeFileSync(__dirname + '/info/es.json', bulk);
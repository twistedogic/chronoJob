var fs = require('fs');
var allStock = fs.readFileSync('../bluechip','utf8');
var lines = allStock.split('\n');
var stockIds = [];

for (var i = 0; i < lines.length; i++){
  stockIds.push(lines[i].split('_')[0]);
}
for (var i = 0; i < stockIds.length; i++){
    var stock = stockIds[i].split('.')[0];
    for (var k = 4; k < 8; k++){
        var fileName = stock + '-' + k;
        var file = fs.readFileSync('info/'+fileName+'.csv','utf8');
        file = file.split('\n');
        var title = file[0];
        var header = file[1];
        header = header.split(',');
        var key = file[2];
        key = key.split(',');
        var value = file[3];
        value = value.split(',');
        var data = key;
        data.unshift('stockId');
        data.unshift(title);
        data.join(',');
        for (var j = 0; j < header.length; j++){
          	var temp = [header[j]];
          	for(var l = 0; l < value.length; l + header.length){
          		temp.push(value[j + l]);
          	}
          	temp.join(',');
          	data.push(temp);
        }
        data.join('\n');
    }
    // fs.writeFileSync(__dirname + '/info/' + fileName + '.tsv', data);
}
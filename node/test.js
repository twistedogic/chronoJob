// var fs = require('fs');
// var csv = require('csv-to-json');
// var dir = fs.readdirSync('info/');
// var json = csv.parse('info/'+ dir[1]);
// console.log(json);
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
    for (var k = 0; k < line.length; k++){
        for (var j = 0; j < line[k].length; j++){
            
        }
        // line[k].join(',');
        // line[k].join(',');
        console.log(line[k].length);
    }
    console.log(line.length);
    // fs.writeFileSync(__dirname + '/info/' + fileName + '.csv', csv);
}

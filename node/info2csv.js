var PouchDB = require('pouchdb');
var db = new PouchDB('companyinfo');
var fs = require('fs');
var options = [
    'financial-ratios',
	'balance-sheet',
	'cashflow-statement',
	'income-statement',
	'earnings-summary',
// 	'dividend-history',
	'fundamentals'
	];
Array.prototype.move = function(from,to){
    this.splice(to,0,this.splice(from,1)[0]);
    return this;
};
//0-4
db.view('info', options[5], function(err, body) {
  if (!err)
    var data = body.rows;
    data.pop();
    var key = [];
    var list = [];
    for (var j = 0; j < data.length; j++) {
        list.push(data[j].id.split('fun')[0].substring(1) + '.HK');
        var json = JSON.parse(data[j].key);
        var tmp = Object.keys(json);
        for (var m = 0; m < tmp.length; m++) {
            if(typeof json[tmp[m]] == 'string'){
                tmp.move(m,0);
            }
        }
        if(tmp.length > key.length){
            key = tmp;
        }
    }
    var list = list.join('\n');
    var csv = key.join(',');
    for (var j = 0; j < data.length; j++) {
        var json = JSON.parse(data[j].key);
        var line = [];
        for (var n = 0; n < key.length; n++) {
            var value = json[key[n]];
            line.push(value)
        }
        line = line.join(',');
        line = line.split('undefined').join('');
        line = line.split('null').join('');
        csv = csv + '\n' + line;
    }
    fs.writeFileSync('../list.csv', list);
    fs.writeFileSync('../fundamentals.csv', csv);
})


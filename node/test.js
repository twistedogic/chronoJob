var PouchDB = require('pouchdb');
var db = new PouchDB('companyinfo');
var fs = require('fs');
var moment = require('moment');
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
db.get('00001'+ options[1]).then(function(res){
    var data = JSON.parse(res.data);
    if (data[0].cover_period > data[1].cover_period){
        var full = Object.keys(data[0]);
        var half = Object.keys(data[1]);
        for (var j = 0; j < full.length; j++) {
            var json = data[0];
            if (typeof json[full[j]] === 'string'){
                full.move(j,0);
            }
        }
        for (var j = 0; j < half.length; j++) {
            var json = data[1];
            if (typeof json[half[j]] === 'string'){
                half.move(j,0);
            }
        }
    } else {
        var half = Object.keys(data[0]);
        var full = Object.keys(data[1]);
        for (var j = 0; j < full.length; j++) {
            var json = data[1];
            if (typeof json[full[j]] === 'string'){
                full.move(j,0);
            }
        }
        for (var j = 0; j < half.length; j++) {
            var json = data[0];
            if (typeof json[half[j]] === 'string'){
                half.move(j,0);
            }
        }
    }
    var fullcsv = full;
    var halfcsv = half;
    for (var j = 0; j < data.length; j++) {
        var json = data[j];
        var line = [];
        if (json.cover_period > 6){
            for (var k = 0; k < full.length; k++) {
                line.push(json[full[k]])
            }
            fullcsv = fullcsv + '\n' + line.join(',');
        } else {
            for (var k = 0; k < half.length; k++) {
                line.push(json[half[k]])
            }
            halfcsv = halfcsv + '\n' + line.join(',');
        }
    }
    // console.log(fullcsv);
    // console.log(halfcsv);
})

db.get('00001'+ options[5]).then(function(res){
    // console.log(res);
    var data = JSON.parse(res.data);
    var keys = Object.keys(data);
    var csv = keys.join(',');
    var values = [];
    for (var m = 0; m < keys.length; m++) {
        values.push(data[keys[m]]);
    }
    csv = csv + '\n' + values.join(',');
    // console.log(csv);
});

db.query('companyinfo2/' + options[0]).then(function (res) {
    var all = res.rows;
    var data = JSON.parse(all[1].key);
    data[0] = data[data.length - 2];
    data[1] = data[data.length - 1];
	if (data[0].cover_period > data[1].cover_period){
	    var full = Object.keys(data[0]);
	    var half = Object.keys(data[1]);
	    for (var j = 0; j < full.length; j++) {
	        var json = data[0];
	        if (typeof json[full[j]] === 'string'){
	            full.move(j,0);
	        }
	    }
	    for (var j = 0; j < half.length; j++) {
	        var json = data[1];
	        if (typeof json[half[j]] === 'string'){
	            half.move(j,0);
	        }
	    }
	} else {
	    var half = Object.keys(data[0]);
	    var full = Object.keys(data[1]);
	    for (var j = 0; j < full.length; j++) {
	        var json = data[1];
	        if (typeof json[full[j]] === 'string'){
	            full.move(j,0);
	        }
	    }
	    for (var j = 0; j < half.length; j++) {
	        var json = data[0];
	        if (typeof json[half[j]] === 'string'){
	            half.move(j,0);
	        }
	    }
	}
	var fullcsv = full;
	var halfcsv = half;
	for (var n = 0; n < all.length; n++) {
	    var data = JSON.parse(all[n].key);
	    for (var j = 0; j < data.length; j++) {
	        var json = data[j];
	        var line = [];
	        if (json.cover_period > 6){
	            for (var k = 0; k < full.length; k++) {
	                line.push(json[full[k]])
	            }
	            fullcsv = fullcsv + '\n' + line.join(',');
	        } else {
	            for (var k = 0; k < half.length; k++) {
	                line.push(json[half[k]])
	            }
	            halfcsv = halfcsv + '\n' + line.join(',');
	        }
	    }
    }
    // console.log(halfcsv);
    // console.log(fullcsv);
}).catch(function (err) {
    console.log(err);
});

db.query('companyinfo2/'+ options[5]).then(function(res){
    // console.log(res);
    var all = res.rows;
    var data = JSON.parse(all[1].key);
    var keys = Object.keys(data);
    for (var j = 0; j < keys.length; j++) {
        var json = data;
        if (typeof json[keys[j]] === 'string'){
            keys.move(j,0);
        }
    }
    var csv = keys.join(',');
    for (var i = 0; i < all.length; i++) {
        var data = JSON.parse(all[i].key);
        var values = [];
        for (var m = 0; m < keys.length; m++) {
            values.push(data[keys[m]]);
        }
        csv = csv + '\n' + values.join(',');
    }
    console.log(csv);
    fs.writeFileSync(__dirname + '/dataset/fundamentals.csv',csv);
});

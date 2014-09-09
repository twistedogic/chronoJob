var fs = require('fs');
var util = require('util');
var _ = require('lodash');
var yahooFinance = require('yahoo-finance');

var startDate = moment().subtract(5, 'days').format('YYYY-MM-DD');
var endDate = moment().format('YYYY-MM-DD');

var allStock = fs.readFileSync('../fullList','utf8');
var lines = allStock.split('\n');
var stockIds = [];
for (var i = 0; i < lines.length; i++){
	stockIds.push(lines[i].split('_')[0]);
}

yahooFinance.historical({
	symbols: stockIds,
	from: startDate,
	//to: endDate,
	period: 'd'
}, function (err, results) {
	if (err) { throw err; }
	_.each(results, function (result) {
		console.log(result.url);
	});
});
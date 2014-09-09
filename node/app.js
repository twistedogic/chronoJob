var fs = require('fs');
var _ = require('lodash');
var yahooFinance = require('yahoo-finance');

var startDate = moment().subtract(3, 'years').format('YYYY-MM-DD');
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
  to: endDate,
  period: 'd'
}, function (err, results) {
  if (err) { throw err; }

  _.each(results, function (result) {
    console.log(util.format(
      '=== %s (%d) ===',
      result.symbol,
      result.quotes.length
    ).cyan);
    console.log(result.url.yellow);
    console.log(
      '%s\n...\n%s',
      JSON.stringify(result.quotes[0], null, 2),
      JSON.stringify(result.quotes[result.quotes.length - 1], null, 2)
    );
  });
});
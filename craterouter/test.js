var YQL = require('yql');
var fs = require('fs');
var uri = [
    "http://mrjbq7.github.io/ta-lib/func_groups/overlap_studies.html",
    "http://mrjbq7.github.io/ta-lib/func_groups/momentum_indicators.html",
    "http://mrjbq7.github.io/ta-lib/func_groups/volume_indicators.html",
    "http://mrjbq7.github.io/ta-lib/func_groups/volatility_indicators.html",
    "http://mrjbq7.github.io/ta-lib/func_groups/price_transform.html",
    "http://mrjbq7.github.io/ta-lib/func_groups/cycle_indicators.html",
    "http://mrjbq7.github.io/ta-lib/func_groups/pattern_recognition.html",
    "http://mrjbq7.github.io/ta-lib/func_groups/statistic_functions.html",
    "http://mrjbq7.github.io/ta-lib/func_groups/math_transform.html",
    "http://mrjbq7.github.io/ta-lib/func_groups/math_operators.html"
    ];
var xpath = '//pre | //*[(@id = "readme")]//h1';
for (var i = 0; i < uri.length; i++){
    var query = new YQL('select * from html where url="' + uri[i] + '" and xpath=' + "'" + xpath + "'");
    query.exec(function (error, response) {
        if(!error){
            var name = response.query.results.h1.a.name;
            var data = response.query.results.pre;
            var output = '# ' + name;
            for(var j = 0; j < data.length; j++){
                var fun = data[j].split('\n')[1];
                var y = "data['" + fun.split(' = ')[0];
                var x = "talib." + fun.split(' = ')[1];
                var z = y.split(', ');
                if(z.length > 0){
                    z[0] = z[0] + "']";
                    for(var m = 1; m < z.length; m++){
                        z[m] = "data['" + z[m] + "']";
                    }
                    y = z.join(',');
                } else {
                    y = y + "']";
                }
                fun = y + " = " + x;
                console.log(fun);
                output = output + '\n' + fun;
            }
            fs.appendFileSync(__dirname + '/snippets/all.txt', output);
        }
    });
}
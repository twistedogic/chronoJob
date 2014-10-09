var DecisionTree = require('decision-tree');
var fs = require('fs');
var data = fs.readFileSync('../report/indicators/0002.HKindicator.csv','utf8');
data = data.split('\n');
data.pop();
var training_data = [];
var test_data = [];
for (var i = 1; i < data.length - 11; i++){
    var line = data[i].split(',');
    var result = data[i+10].split(',')[line.length-1];
    line.pop();
    var temp = {
    	inputA: line[0],
    	inputB: line[1],
    	inputC: line[2],
    	inputD: line[3],
    	inputE: line[4],
    	output: result
    };
    var remain = data.length - i;
	  if (remain > 300){
	    training_data.push(temp);
	  } else {
	    test_data.push(temp);
	  }
}
var class_name = 'output';
var features = ['inputA','inputB','inputC','inputD','inputE'];
var dt = new DecisionTree(training_data, class_name, features);
var accuracy = dt.evaluate(test_data);
console.log(accuracy);

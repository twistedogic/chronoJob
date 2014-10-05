var brain = require('brain');
var net = new brain.NeuralNetwork();
var fs = require('fs');
var data = fs.readFileSync('../report/indicators/0001.HKindicator.csv','utf8');
data = data.split('\n');
data.pop();
var training_data = [];
var test_data = [];
for (var i = 1; i < data.length - 11; i++){
    var line = data[i].split(',');
    var result = data[i+10].split(',')[line.length-1];
    line.pop();
    var temp = {
    	input: line,
    	output: [result]
    };
	if (i < 300){
	    training_data.push(temp);
	} else {
	    test_data.push(temp);
	}
	
}
console.log(training_data);
net.train(training_data,{
  errorThresh: 0.01,  // error threshold to reach
  iterations: 2000000,   // maximum training iterations
  log: true,           // console.log() progress periodically
  logPeriod: 10,       // number of iterations between logging
  learningRate: 0.6    // learning rate
});
var brain = require('brain');
var net = new brain.NeuralNetwork();
var fs = require('fs');
var data = fs.readFileSync('../report/indicators/0001.HKindicator.csv','utf8');
data = data.split('\n');
data.pop();
var training_data = [];
var test_data = [];
for (var i = 251; i < data.length - 11; i++){
    var line = data[i].split(',');
    var result = data[i+10].split(',')[line.length-1];
    line.pop();
    var temp = {
    	input: [line],
    	output: [result]
    };
    var remain = data.length - i;
	  if (remain > 300){
	    training_data.push(temp);
	  } else {
	    test_data.push(temp);
	  }
}
net.train(training_data,{
  errorThresh: 0.01,  // error threshold to reach
  iterations: 20000,   // maximum training iterations
  log: true,           // console.log() progress periodically
  logPeriod: 10000,       // number of iterations between logging
  learningRate: 0.6    // learning rate
});
for (var i = 0; i < test_data.length; i++){
  var output = net.run(test_data[i].input);
  var actual = test_data[i].output;
  console.log('actual: ' + actual + ', output: ' + output);
}
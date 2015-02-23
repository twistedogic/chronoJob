var hipchat = require('node-hipchat');
var apiKey = process.argv[2];
var HC = new hipchat(apiKey);

var params = {
  room: 'Alert', // Found in the JSON response from the call above
  from: 'System',
  message: 'tests',
  color: 'red'
};
HC.postMessage(params, function(data) {
  console.log(data);
});
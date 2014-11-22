var hipchat = require('node-hipchat');

var HC = new hipchat('hip chat API');

var params = {
  room: 'Alert', // Found in the JSON response from the call above
  from: 'System',
  message: 'tests',
  color: 'red'
};
HC.postMessage(params, function(data) {
  console.log(data);
});
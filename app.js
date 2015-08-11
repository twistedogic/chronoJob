var connect = require('connect'),
    directory = __dirname + '/public';
var port = process.ENV.port || '3001';
var bootstrap = require('./lib/files.js');

connect()
    .use(connect.static(directory))
    .listen(port);

console.log('Listening on port ' + port);
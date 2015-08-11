var crate = require("node-crate");
var crateIP = process.ENV.crate || '10.0.0.114';
crate.connect(crateIP, 4200);
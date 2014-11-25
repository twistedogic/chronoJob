var request = require("request");

//index
request("https://www.kimonolabs.com/api/8gapinua?apikey=b79c31149fa688334be9cdff3d024e89", 
function(err, response, body) {
  console.log(body);
});

//News
request("https://www.kimonolabs.com/api/50rgsykk?apikey=b79c31149fa688334be9cdff3d024e89", 
function(err, response, body) {
  console.log(body);
});

//Market Move
request("https://www.kimonolabs.com/api/3a6ocjp6?apikey=b79c31149fa688334be9cdff3d024e89", 
function(err, response, body) {
  console.log(body);
});
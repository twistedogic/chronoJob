var request = require('request');
var fs = require('fs');
var redis = require('redis');
var redisHost = process.argv[2] || '172.17.8.101';
var restcommander = process.argv[3] || '172.17.8.101';
var client = redis.createClient(6379, redisHost, {})
// var list = 'https://raw.githubusercontent.com/twistedogic/chronoJob/master/fullList';
var list = process.argv[4] || 'https://raw.githubusercontent.com/twistedogic/chronoJob/master/bluechip';
request(list,function(err,res,body){
    fs.writeFileSync(__dirname + '/target', body);
})
setInterval(function(){
var target = fs.readFileSync(__dirname + '/target', 'utf8');
target = target.split('\n');
var blue = [];
for (var i = target.length - 1; i >= 0; i--) {
    blue.push(target[i].split('.HK_')[0])
}
var json = {};
for (var i = 0; i < blue.length; i++) {
    var symbol = blue[i];
    json[symbol] = {
        "map":{
            "TICK":symbol,
            "APIVARREPLACE_SUPERMANSPECIAL_TARGET_NODE_VAR":"www.etnet.com.hk" //https://api.investtab.com/api/quote/$TICK:HK/realtime-quote
        }
    };
}
var command = {
   "targetNodes":blue,  
   "willAggregateResponse":true,
   "useNewAggregation":false,  
   "aggregationType":"PATTERN_GET_QUOTE",  
   "agentCommandType":"GET_JSON",
   "replacementVarMapNodeSpecific":json
}

var option = {
    url:'http://' + restcommander + ':9000/commands/genUpdateSendCommandWithReplaceVarMapNodeSpecificAdhocJson',
    method:'POST',
    json:command
}
request(option,function(err,res,body){
    var data = body.aggregationValueToNodesList;
    // console.log(data);
    var price = [];
    var timenow = new Date().getTime();
    for (var i = 0; i < data.length; i++) {
        var value = data[i].value;
        if (value > 0){
            for (var j = 0; j < data[i].nodeList.length; j++) {
                client.append(data[i].nodeList[j], "{'symbol':" + data[i].nodeList[j] + ",'price':" + value + ", 'time':" + timenow + "},");
                price.push({'symbol':data[i].nodeList[j],'price':value, 'time':timenow});
            }
        }
    }
    console.log(price);
})
},3000);
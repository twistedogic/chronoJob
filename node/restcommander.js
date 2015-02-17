var request = require('request');
var fs = require('fs');
var list = 'https://raw.githubusercontent.com/twistedogic/chronoJob/master/fullList';
// var list = 'https://raw.githubusercontent.com/twistedogic/chronoJob/master/bluechip';
request(list,function(err,res,body){
    fs.writeFileSync(__dirname + '/target', body);
})
setTimeout(function(){
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
            "APIVARREPLACE_SUPERMANSPECIAL_TARGET_NODE_VAR":"www.etnet.com.hk"
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
    url:'http://172.17.8.101:9000/commands/genUpdateSendCommandWithReplaceVarMapNodeSpecificAdhocJson',
    method:'POST',
    json:command
}
request(option,function(err,res,body){
    console.log(body);
    // var data = body.aggregationValueToNodesList;
    // var price = [];
    // for (var i = 0; i < data.length; i++) {
    //     var value = data[i].value;
    //     if (data[i].nodeList.length > 1){
    //         for (var j = 0; j < data[i].nodeList.length; j++) {
    //             price.push({'symbol':data[i].nodeList[j],'price':value});
    //         }
    //     } else {
    //         price.push({'symbol':data[i].nodeList[0],'price':value});
    //     }
    // }
    // console.log(price.length);
})
},5000);

var request = require('request');
request.post({
    url:'http://10.0.0.114:8004/ocpu/github/twistedogic/TAA/R/TAA', 
    json: {"id":"0002.HK","endPoint":"http://10.0.0.114:3000/api/hist/desc/"}
}, function(err,resp,body){
    if(err){
        console.log(err);
    } else {
        var data = body.split('\n');
        var dataurl = resp.headers.location + 'R/.val/csv';
        console.log(dataurl);
        request(dataurl,function(err,resp,body){
            if(err){
                console.log(err);
            } else {
                console.log(body);
            }
        })
    }
    
})
var me = process.argv[2]; // Set this to your own account
var password = process.argv[3];
var cred = {
    account:me,
    password:password
};
var Cloudant = require('cloudant')(cred);
var companyinfo = Cloudant.use('companyinfo');
var technical = Cloudant.use('technical');
var request = require('request');
companyinfo.view('info','fundamentals',function(err,body){
    if(!err){
        body.rows.forEach(function(d) {
            if (d.key.indexOf('<') < 0){
                var value = JSON.parse(d.key);
                var url = 'https://api.investtab.com/api/quote/' + value.symbol + '/technical';
                request(url, function(e,r,b){
                    if(!e){
                        var doc = JSON.parse(b);
                        if(doc.as_of_date){
                            var id = doc.symbol + doc.as_of_date.split('T')[0];
                            technical.insert(doc,id,function(error,res){
                                if(!error){
                                    console.log(res);
                                }
                            })
                        }
                    }
                })
            }
        })
        // for (var i = 0; i < csv.length; i++) {
        //     var stock = csv[i].split('.')[0];
        //     request('https://api.investtab.com/api/quote/0' + stock + ':HK/technical',function(e,r,b){
        //         if(!e){
        //             var data = JSON.parse(b);
        //             if(data.as_of_date){
        //                 var id = data.symbol + data.as_of_date.split('T')[0];
        //                 var doc = {
        //                     _id: id,
        //                     data: data
        //                 };
        //                 console.log(doc);
        //             }
        //         }
        //     })
        // }
    }
})
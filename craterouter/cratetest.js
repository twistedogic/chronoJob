var crate = require('cratejs');
var crateIP = process.argv[2] || '192.168.100.78';
var db = new crate({
  host: crateIP,
  port: 4200
});
var moment = require('moment');
var getData = db.Query('SELECT * FROM ta where symbol = ? order by date asc');
getData.execute(['0001.HK'], function(err, resp) {
    if(!err && resp.rows.length > 0){
        var csv = resp.cols.join(',');
        var search = csv.split(',date,')[0];
        var pos = search.split(',').length;
        var data = resp.rows;
        for (var i = 0; i < resp.rows.length; i++){
           data[i][pos] = moment(resp.rows[i][pos]).format("YYYY-MM-DD");
           csv = csv + '\n' + data[i].join(',');
        }
        res.contentType('csv');
        res.send(csv);
    } else {
        res.json({message:'record not found'});
    }
});
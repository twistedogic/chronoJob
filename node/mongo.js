var mongoose = require('mongoose');
var moment = require('moment');
mongoose.connect('mongodb://172.17.42.1/stock');
var fs = require('fs');
var stock = '0001.HK';
var lineList = fs.readFileSync('/home/guest/chronoJob/report/results/' + stock + 'TA.csv').toString().split('\n');
lineList.shift(); // Shift the headings off the list of records.

var schemaKeyList = ["Date","Open","High","Low","Close","Volume","Adjusted","change","rsi","fastK","fastD","slowD","smi","smiSignal","macd","macdSignal","Lower","Middle","Upper","ptcB","tr","atr","trueHigh","trueLow","cV","tdi","di","DIp","DIn","DX","ADX","mfi","obv","sar","dviMag","dviStr","dvi","sma10","sma20","sma50","sma100","sma150","sma250","roc5","roc10","roc20","roc50","roc100","roc150","roc250"];

var stockSchema = new mongoose.Schema({
    'Symbol': String,
    'Date': Date,
    'Open': Number,
    'High': Number,
    'Low': Number,
    'Close': Number,
    'Volume': Number,
    'Adjusted': Number,
    'change': Number,
    'rsi': Number,
    'fastK': Number,
    'fastD': Number,
    'slowD': Number,
    'smi': Number,
    'smiSignal': Number,
    'macd': Number,
    'macdSignal': Number,
    'Lower': Number,
    'Middle': Number,
    'Upper': Number,
    'ptcB': Number,
    'tr': Number,
    'atr': Number,
    'trueHigh': Number,
    'trueLow': Number,
    'cV': Number,
    'tdi': Number,
    'di': Number,
    'DIp': Number,
    'DIn': Number,
    'DX': Number,
    'ADX': Number,
    'mfi': Number,
    'obv': Number,
    'sar': Number,
    'dviMag': Number,
    'dviStr': Number,
    'dvi': Number,
    'sma10': Number,
    'sma20': Number,
    'sma50': Number,
    'sma100': Number,
    'sma150': Number,
    'sma250': Number,
    'roc5': Number,
    'roc10': Number,
    'roc20': Number,
    'roc50': Number,
    'roc100': Number,
    'roc150': Number,
    'roc250': Number
});
var stockDoc = mongoose.model('stockData', stockSchema);

// function queryAllEntries () {
//     stockDoc.aggregate(
//         {$group: {_id: '$RepName', oppArray: {$push: {
//             OppID: '$OppID', 
//             OppName: '$OppName',
//             PriorAmount: '$PriorAmount',
//             Amount: '$Amount'
//             }}
//         }}, function(err, qDocList) {
//         console.log(util.inspect(qDocList, false, 10));
//         process.exit(0);
//     });
// }

// Recursively go through list adding documents.
// (This will overload the stack when lots of entries
// are inserted.  In practice I make heavy use the NodeJS 
// "async" module to avoid such situations.)
function createDocRecurse (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    if (lineList.length) {
        var line = lineList.shift();
        var doc = new stockDoc();
        doc['Symbol'] = stock;
        line.split(',').forEach(function (entry, i) {
            if (i === 0) {
                doc[schemaKeyList[i]] = moment(entry);
            } else {
                doc[schemaKeyList[i]] = entry;
            }
        });
        doc.save(createDocRecurse);
        console.log('running');
    } else {
        console.log('complete');
    }
    // } else {
    //     // After the last entry query to show the result.
    //     queryAllEntries();
    // }
    
}

createDocRecurse(null);
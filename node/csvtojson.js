//Converter Class
var Converter=require("csvtojson").core.Converter;
var fs=require("fs"); 


//CSV File Path or CSV String or Readable Stream Object
var csvFileName="/home/guest/chronoJob/node/dataset/0001.HK.csv";
var fileStream=fs.createReadStream(csvFileName);
//new converter instance
var csvConverter=new Converter();

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){

    console.log(jsonObj); //here is your result json object
    fs.writeFileSync('/home/guest/chronoJob/node/dataset/0001.HK.json', JSON.stringify(jsonObj))

});

fileStream.pipe(csvConverter);
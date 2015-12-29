var express = require("express");
var bodyParser = require("body-parser");
var ip = require("ip");


if(process.argv.length < 3 || process.argv.length > 4){
  console.log("Usage: node server.js <deviceId> [port]");
  process.exit(-1);
}

var deviceId = process.argv[2];
var deviceModule;

try{
  deviceModule = require('./devices/' + deviceId + '/deviceModule.js');
}catch(e){
  console.log("Device '" + deviceId + "' is not supported.");
  process.exit(-1);
}

var port = parseInt(process.argv[3], 10) || 3000;


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use('/device', express.static(__dirname + '/devices/' + deviceId + '/public'));

try{
  var server = app.listen(port, function () {
    console.log("Go to http://%s:%s in your browser to enjoy IoBlocks!", ip.address(), port);
  });

  var device = deviceModule.init(server);

  app.get('/',function(req,res){
    res.sendfile(__dirname + '/index.html');
  });

  app.post('/program/run', device.run);
  app.post('/program/text-input', device.textInput);
  app.get('/program/stop', device.stop);

}catch(e){
  console.log("Server error:");
  console.log(e);
}
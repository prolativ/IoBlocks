var express = require("express");
var app = express();
var path = require("path");

var deviceLoader = require("./js/deviceLoader");
var devices = deviceLoader.load();
console.log(devices);


app.get('/',function(req,res){
  res.sendfile(path.join(__dirname + '/index.html'));
});

app.use(express.static(__dirname + '/public'));

app.get('*',function(req,res){
  res.sendfile(path.join(__dirname + '/index.html'));
});



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
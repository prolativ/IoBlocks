var express = require("express");
var app = express();
var path = require("path");
var _ = require ("underscore");


//var dict = {'a': 'b', 'x': 'y'};
var dict = [
  {meaning: 'abc', translation: 'xyz'},
  {meaning: 'bcd', translation: 'wxy'}
];

//app.use(app.router);

/*
app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendfile(path.join(__dirname + '/index.html'));
});*/

//var dictRouter = require('./app/dict/routes.js');



app.get('/',function(req,res){
  res.sendfile(path.join(__dirname + '/index.html'));
});

app.use(express.static(__dirname + '/public'));

/*
app.use('/dict', express.static(__dirname + '/app/dict/public'));

app.get('/dict/list', function(req, res){
  res.json(dict);
});
*/

/*
app.post('/dict', function(req, res){
  _.extend(dict, req.body);
});
*/

app.get('*',function(req,res){
  res.sendfile(path.join(__dirname + '/index.html'));
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
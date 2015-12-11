var requirejs = require('requirejs');

requirejs.config({
  baseUrl: 'js',
  paths: {
    'nodeRequire': require
  }
});

requirejs(['express', 'path', 'body-parser', 'fs', 'scp2', 'child_process', 'socket.io'],
        function(express, path, bodyParser, fs, scp2, childProcess, socketIO){

  var app = express();

  var port = Number.parseInt(process.argv[2] || "3000");
  var deviceId = process.argv[3] || undefined;

  var spawn = childProcess.spawn;

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(express.static(__dirname + '/public'));

  var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Go to http://%s:%s in your browser to enjoy IoBlocks!", host, port);
  });

  var io = socketIO(server);

  app.get('/',function(req,res){
    res.sendfile(path.join(__dirname + '/index.html'));
  });

  app.post('/project/settings/save', function(req, res) {
    var settingsFile = './connection_details.json';

    fs.writeFile(settingsFile, JSON.stringify(req.body), function(err) {
      if (err) throw err;
      console.log('settings saved');
    });

    res.json({status: 200});
  });

  app.get('/project/settings/load', function(req, res) {
    var settingsFile = './connection_details.json';

    fs.readFile(settingsFile, function(err, data) {
      if (err) {
        console.log(err);
        res.status(500).send({error: err});
      } else {
        res.json(JSON.parse(data));
      }
    })
  });

  var program;

  app.post('/project/run', function(req, res) {
    var code = req.body.code;
    var fileName = "code.py";
    var filePath = "./" + fileName;

    fs.writeFile(filePath, code, { flags: 'wx' }, function (err) {
      if (err) throw err;
      console.log("code is saved!");
    });

    program = spawn('python2.7', ['-u', 'code.py']);

    program.stdout.on('data', function (data) {
        io.emit('server data', data.toString());
    });

    program.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    program.on('exit', function (code) {
        console.log('child process exited with code ' + code);
    });

    res.json({status: 200});
  });

  app.post('/project/text', function(req, res){
    var text = req.body.text;
    try{
      program.stdin.write(text + "\n");
      res.json({status: 200});
    }catch(e){
      console.log(e);
      res.json({status: 500});
    }
  });

  app.get('/program/test', function(req, res) {
    for (var i = 0; i < 10; i++) {
      io.emit('server data', 'test');
    };

    res.json({status: 200});
  });

  app.get('/program/stop', function(req, res) {
    res.json({status: 200});
  });
});
var requirejs = require('requirejs');

requirejs.config({
	baseUrl: 'js',

	paths: {
		'nodeRequire': require
	}
});

requirejs(['express', 'path', 'body-parser', 'fs', 'scp2', 'ssh2', 'socket.io'],
        function(express, path, bodyParser, fs, scp2, ssh2, socketIO){

	var app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(express.static(__dirname + '/public'));

    var server = app.listen(3000, function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log("Go to http://%s:%s in your browser to enjoy IoBlocks!", host, port);
    });

    var io = socketIO(server);

	app.get('/',function(req,res){
	   res.sendfile(path.join(__dirname + '/index.html'));
	});

    app.post('/project/save', function(req, res){
      var filePath = req.body.filePath;
      var fileData = req.body.fileData;

      fs.writeFile(filePath, JSON.stringify(fileData), function(err) {
        if(err) {
            console.log(err);
            res.status(500).send({ error: err});
        }else{
            console.log('Project successfully saved');
        }
      });
    });

    app.post('/project/load', function(req,res){
      var filePath = req.body.filePath;

      fs.readFile(filePath, function(err, data){
        if(err){
            console.log(err);
            res.status(500).send({ error: err});
        }else{
            res.json(JSON.parse(data));
        }
      });
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

    app.post('/project/run', function(req, res) {
      var code = req.body.code;
      var fileName = "code.py";
      var filePath = "./" + fileName;

      var connectionData = require('./connection_details.json');

      fs.writeFile(filePath, code, { flags: 'wx' }, function (err) {
        if (err) throw err;
        console.log("code is saved!");
      });

      var filesToSend = [
        'python/copernicus_helpers.py',
        'python/timer.py',
        'python/copernicus-api/copernicus.py'
      ];

      var pathAtRoot = 'root@' + connectionData.host + ':/home/root/';

      // for(var file of filesToSend) {
      //     scp2.scp(file, pathAtRoot, function(err) {
      //         if (err) {
      //             console.log(err);
      //             throw err;
      //         } else {
      //             console.log('scp2: success');
      //         }
      //     });
      // }

      console.log(connectionData);
      console.log(connectionData.host + ':/home/root/');

      scp2.scp(fileName, pathAtRoot, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('scp2: success');
            sshConnect();
        }
      });

      res.json({status: 200});
    });

    var Client = ssh2.Client;
    var conn = new Client();

    conn.on('ready', function() {
      console.log('Client :: ready');
      conn.exec('python -u code.py', function(err, stream) {
        if (err) console.log(err);
        stream.on('close', function(code, signal) {
          console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
          conn.end();
        }).on('data', function(data) {
          console.log('STDOUT: ' + data);
          io.emit('server data', ''+data);
        }).stderr.on('data', function(data) {
          console.log('STDERR: ' + data);
        });
      });
    })

    function sshConnect() {
      var connectionData = require('./connection_details.json');

      if (!connectionData.host || !connectionData.user) {
        res.status(406).json({});
      } else {
        conn.connect({
          host: connectionData.host,
          username: connectionData.user,
          password: connectionData.password
        });
      }
    }

    app.get('/program/test', function(req, res) {
      var Client = ssh2.Client;
      var conn2 = new Client();

      var connectionData = require('./connection_details.json');

      // conn2.on('ready', function() {
      //     console.log('Client :: ready');
      //     conn2.exec('cd /home/students/apstras/workspace/test && ./program ', function(err, stream) {
      //         if (err) console.log(err);
      //         stream.on('close', function(code, signal) {
      //         console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      //         conn2.end();
      //     }).on('data', function(data) {
      //         console.log('STDOUT: ' + data);
      //         io.emit('server data', ''+data);
      //     }).stderr.on('data', function(data) {
      //         console.log('STDERR: ' + data);
      //     });
      //   });
      // }).connect({
      //     host: connectionData.host,
      //     username: connectionData.user,
      //     password: connectionData.password
      // });

      for (var i = 0; i < 10; i++) {
        io.emit('server data', 'test');
      };

      res.json({status: 200});
    });

    app.get('/program/stop', function(req, res) {
      conn.end();
      res.json({status: 200});
    });

	app.get('*',function(req,res){
    res.sendfile(path.join(__dirname + '/index.html'));
	});
});
var fs = require("fs");
var childProcess = require("child_process");
var socketIO = require("socket.io");

exports.init = function(server){
  var program;
  var io = socketIO(server);

  var run = function(req, res) {
    var programCode = req.body.code;
    var fileName = "code.py";
    var filePath = path.join(__dirname, "project", fileName);

    fs.writeFile(filePath, programCode, { flags: 'wx' }, function (err) {
      if (err){
        console.log("Could not save the file with the user's code.");
        res.json({status: 500});
      }else{
        program = childProcess.spawn('python2.7', ['-u', filePath]);

        program.stdout.on('data', function (data) {
            io.emit('program stdout', data.toString());
        });

        program.stderr.on('data', function (data) {
            console.log("User's program's stderr: " + data);
        });

        program.on('exit', function (exitCode) {
            console.log('Child process exited with code: ' + exitCode);
        });

        res.json({status: 200});
      }
    });
  };

  var textInput = function(req, res){
    var text = req.body.text;
    try{
      program.stdin.write(text + "\n");
      res.json({status: 200});
    }catch(e){
      console.log(e);
      res.json({status: 500});
    }
  };

  var stop = function(req, res) {
    program && program.kill('SIGKILL');
    res.json({status: 200});
  };

  return{
    run: run,
    textInput: textInput,
    stop: stop
  };

};


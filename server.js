var requirejs = require('requirejs');

requirejs.config({
	baseUrl: 'js',

	paths: {
		'nodeRequire': require
	}
});


requirejs(['express', 'path', 'body-parser', 'fs', 'simple-ssh'],
        function(express, path, bodyParser, fs, simpleSSH){

	var app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(express.static(__dirname + '/public'));

	app.get('/',function(req,res){
	   res.sendfile(path.join(__dirname + '/index.html'));
	});

    app.post('/project/save', function(req, res){
        var filePath = req.body.filePath;
        var fileData = req.body.fileData;

        fs.writeFile(filePath, JSON.stringify(fileData), function(err) {
            if(err) {
                return console.log(err);
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
            }else{
                res.json(JSON.parse(data));
            }
        });
    });

    app.post('/project/run', function(req, res) {
        var code = req.body.code;
        console.log('code received');

        // this will be read from the file
        var ssh = new simpleSSH({
            host: 'gandalf.icsr.agh.edu.pl',
            user: '',
            pass: ''
        });

        ssh.exec('cd workspace/test && ./program', {
            out: function(stdout) {
                res.json({
                    data: stdout,
                    status: 200
                });
            },
            err: function(stderr) {
                console.log(stderr);
            }
        }).start();

        // res.json({status: 200 });
    });

	app.get('*',function(req,res){
	   res.sendfile(path.join(__dirname + '/index.html'));
	});


	var server = app.listen(3000, function () {
	  var host = server.address().address;
	  var port = server.address().port;
	  console.log("Go to http://%s:%s in your browser to enjoy IoBlocks!", host, port);
	});

});
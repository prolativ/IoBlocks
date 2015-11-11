var requirejs = require('requirejs');

requirejs.config({
	baseUrl: 'js',

	paths: {
		'nodeRequire': require
	}
});


requirejs(['express', 'path', 'body-parser', 'fs'],
        function(express, path, bodyParser, fs){

	var app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(express.static(__dirname + '/public'));

    var snapshotRelPath = "projects/snapshot.json";

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

    app.post('/snapshot', function(req,res){
        var snapshotPath = path.dirname(require.main.filename) + "/" + snapshotRelPath;
        fs.writeFile(snapshotPath, JSON.stringify(req.body), function(err) {
            if(err) {
                console.log(err);
                res.status(500).send({ error: err});
            }else{
                console.log('Snapshot successfully saved');
            }
        });
    });

    app.get('/snapshot', function(req,res){
        var snapshotPath = path.dirname(require.main.filename) + "/" + snapshotRelPath;
        fs.readFile(snapshotPath, function(err, data){
            if(err){
                console.log(err);
                res.status(500).send({ error: err});
            }else{
                res.json(JSON.parse(data));
            }
        });
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
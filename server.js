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

    var snapshotPath = "/home/prolativ/Programowanie/js/IoBlocks/projects/snapshot.json";
    var snapshot = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="copernicus_event_light" x="102" y="59"><field name="OLD_VAR">old_light</field><field name="NEW_VAR">new_light</field><statement name="REACTION_BLOCK"><block type="text_print"><value name="TEXT"><block type="text"><field name="TEXT">aaaa</field></block></value></block></statement></block><block type="text_print" x="284" y="155"><value name="TEXT"><block type="text"><field name="TEXT">bbb</field></block></value></block></xml>';


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

    app.post('/snapshot', function(req,res){
        fs.writeFile(snapshotPath, JSON.stringify(req.body), function(err) {
            if(err) {
                return console.log(err);
            }else{
                console.log('Snapshot successfully saved');
            }
        });
    });

    app.get('/snapshot', function(req,res){
        fs.readFile(snapshotPath, function(err, data){
            if(err){
                console.log(err);
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
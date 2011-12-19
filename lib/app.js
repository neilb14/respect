var express = require('express'),
		fs = require('fs'),
		http = require('http');

function respond(view, req, res, results) {
	if(req.params.format == 'js') {
		res.send(results);
	} else {
		res.render(view, results);
	}
}

function readFeatures(directory, current) {
	filenames = fs.readdirSync(directory);
	filenames.forEach(function(filename) {
			var stats = fs.lstatSync(directory + '/' + filename);
			if(!stats.isDirectory()){ current.specs.push({name:filename.split('.').shift(),runUrl:current.runUrl + '/' + filename.split('.').shift()}); return; }
			var feature = {
				name: filename,
				runUrl: current.runUrl + filename,
				features: [],
				specs: []
			};
			readFeatures(directory + '/' + filename, feature);
			current.features.push(feature);
	});
}

process.argv.shift();
process.argv.shift();
home = process.argv.shift() || '..';

var app = express.createServer();
app.use(express.logger());
app.use(express.bodyParser());
app.use(app.router);
app.use("/respect", express.static(__dirname + '/../public'));
console.log("Static: " + __dirname + '/../public');

if(home == '..') {
	 app.set('views', '../views');
}

console.log('Respecting ' + home);
eval(fs.readFileSync(home + '/respect.config', encoding="ascii"));

app.get("/respect/features.:format?", function(req,res) {
	fs.readdir(home + '/features', function (err, filenames) {
		if(err != null) {
			res.send("<html><body><p>" + err + "</p></body></html>");
		}
		if(filenames == null || filenames.length <= 0) {
				res.send("<html><body><p>No features defined.</p></body></html>");
				return;
		}
		var root = {name:'root',runUrl:'/respect/feature/',features:[],specs:[]};
		readFeatures(home + '/features/', root);
		var results = {title:settings.title, features:root};
		respond('features.jade', req, res, results);
	});
});

app.get("/respect/feature/:feature/:spec.:format?", function(req, res) {
	respond('spec.jade', req, res, {title:settings.title, feature:req.params.feature, spec:req.params.spec, runUrl:'/respect/feature/' + req.params.feature + '/' + req.params.spec});
});

app.post("/respect/feature/:feature/:spec.:format?", function(req, res){
	eval(fs.readFileSync(home + '/features/' + req.params.feature + '/' + req.params.spec + '.js', encoding="ascii"));
	var options = {
		host: settings.targetHost,
		port: settings.targetPort,
		path: test.url,
		method: test.method
	};
	var testReq = http.request(options, function(testRes) {
								console.log("STATUS: " + testRes.statusCode);	
								console.log("HEADERS: " + JSON.stringify(testRes.headers));	
								testRes.setEncoding('utf8');
								testRes.on('data', function(chunk) {
									console.log("BODY: " + chunk);
									var result = {layout:false,test:test,result:test.verify(testRes, chunk)};
									if(req.params.format == 'js') {
										res.send(result);
									} else { 
										res.render('run.jade', result);
									}
								});
							});
	testReq.on('error', function(e) {
		console.error('Problem with request: ' + e.message);
	});
	testReq.end();
});

var port = settings.port || process.env.PORT || 8818;
console.log('Respect server listening on ' + port);
app.listen(port);

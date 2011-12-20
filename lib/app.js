var express = require('express'),
		fs = require('fs'),
		jasmine = require('jasmine-node');

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

if(process.cwd().split('\\').pop() == 'lib'){
    process.chdir('..');
}
process.argv.shift();
process.argv.shift();
home = process.argv.shift() || process.cwd();

var app = express.createServer();
app.use(express.logger());
app.use(express.bodyParser());
app.use(app.router);
app.use("/respect", express.static(process.cwd() + '/public'));

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
	var extensions = 'js';
	var match = '.';
	var junitreport = {
  	report: false,
  	savePath : process.cwd() + "/reports/",
  	useDotNotation: true,
  	consolidate: true
	}
	var specs = new RegExp(match + "spec\\.(" + extensions + ")$", 'i');
	jasmine.loadHelpersInFolder(process.cwd() + '/lib/helpers', new RegExp("[-_]helper\\.(" + extensions + ")$"));
	jasmine.executeSpecsInFolder(process.cwd() + '/features',
                             function(runner, log){ 
																console.log("Done: " + JSON.stringify(runner.results()));
																if(req.params.format == 'js') {
																	res.send({testResults:runner.results()});
																} else { 
																	res.render('run.jade', {layout:false, testResults:runner.results()});
																}
															},
                             false,
                             false,
                             false,
                             false,
                             specs,
                             junitreport);
});

var port = settings.port || process.env.PORT || 8818;
console.log('Respect server listening on ' + port);
app.listen(port);

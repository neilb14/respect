var express = require('express'),
		fs = require('fs');

function respond(view, req, res, results) {
	if(req.params.format == 'js') {
		res.send(results);
	} else {
		res.render(view, results);
	}
}

process.argv.shift();
process.argv.shift();
home = process.argv.shift() || '..';

var app = express.createServer();
app.use(express.logger());
app.use(express.bodyParser());

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
		var results = {title:settings.title, features:filenames};
		respond('features.jade', req, res, results);
	});
});

app.get('/respect/stuff/:name', function(req,res) {
	res.send(req.params.name);
});

var port = settings.port || process.env.PORT || 8069;
console.log('Respect server listening on ' + port);
app.listen(port);
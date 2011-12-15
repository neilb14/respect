var express = require('express'),
		fs = require('fs');
var app = express.createServer(
	express.logger(),
	express.bodyParser()
);

app.get('/respect/features', function(req,res) {
	fs.readdir('../features', function (err, filenames) {
		if(err != null) {
			res.send("<html><body><p>Error: " + err + "</p></body></html>");
		}
		if(filenames == null || filenames.length <= 0) {
				res.send("<html><body><p>No features defined.</p></body></html>");
				return;
		}
		res.render('features.jade', {features:filenames});
	});
});

app.get('/respect/stuff/:name', function(req,res) {
	res.send(req.params.name);
});

var port = process.env.PORT || 80;
console.log('Respect server listening on ' + port);
app.listen(port);

var express = require('express'),
		fs = require('fs');
var app = express.createServer();
app.get('/respect/features', function(req,res) {
	fs.readdir('../features', function (err, filenames) {
		if(err != null) {
			res.send("<html><body><p>Error: " + err + "</p></body></html>");
		}
		if(filenames == null || filenames.length <= 0) {
				res.send("<html><body><p>No features defined.</p></body></html>");
				return;
		}
    var i;
		var output = "<html><body><ul>"
    for (i = 0; i < filenames.length; i++) {
				output += "<li>" + filenames[i] + "</li>";
    }
		output += "</ul></body></html>";
		res.send(output);
	});
});
app.listen(process.env.PORT);

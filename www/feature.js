var express = require('express');
var feature = express.createServer();
feature.get('/respect/feature', function(req,res) {
	res.send('Du bist schweinehunde!!');
});
feature.get('/respect/feature/foo', function(req,res) {
	res.send('Mahlzeit von foo');
});
feature.get('/respect/feature/bar', function(req,res) {
	res.send('Mahlzeit von bar');
});
feature.listen(process.env.PORT);

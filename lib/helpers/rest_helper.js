var http = require('http');

(function(){
	this.get = function(path, verify) {
		var options = {
			host: settings.targetHost,
			port: settings.targetPort,
			path: path,
			method: 'GET'
		};
		var req = http.request(options, function(res) {
								res.setEncoding('utf8');
								res.on('data', function(chunk){
                                    verify(res, chunk);
                                    respond();
                                });
							});
		req.on('error', function(e) {
			console.error('Problem with request: ' + e.message);
		});
		req.end();
	};	
})();

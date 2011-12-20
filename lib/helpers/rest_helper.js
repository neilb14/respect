var http = require('http');

(function(){
	var _options = {host: settings.targetHost, port: settings.targetPort};
	this.setOptions = function(options){ 
		_options.methd = options.method;
		_options.path = options.path;
	};

	this.get = function(path, verify) {
		var options = {
			host: settings.targetHost,
			port: settings.targetPort,
			path: path,
			method: 'GET'
		};
		var testReq = http.requestSync(options, function(testRes) {
								testRes.setEncoding('utf8');
								testRes.on('data', verify);
							});
		testReq.on('error', function(e) {
			console.error('Problem with request: ' + e.message);
		});
		testReq.end();
	};	
})();

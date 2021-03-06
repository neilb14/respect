var http = require('http');
(function(){
	this.get = function(path, verify, error) {
		var options = {
			host: settings.targetHost,
			port: settings.targetPort,
			path: path,
			method: 'GET'
		};
        runs(function() {
		    var req = http.request(options, function(res) {
								res.setEncoding('utf8');
								res.on('data', function(chunk){ 
																		console.log('Rest Helper CHUNK: ' + chunk);
                                    verify(res, JSON.parse(chunk)); 
                                });
							});
		    req.on('error', function(e) { 
                fail(e.message);
            });
    		req.end();
        });
        waits(1000);
	};	
})();

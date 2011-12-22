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
                                    verify(res, JSON.parse(chunk)); 
                                });
							});
		    req.on('error', function(e) { error(e); });
    		req.end();
        });
        waits(1000);
	};	
})();

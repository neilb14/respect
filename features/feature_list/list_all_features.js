test = {
	description: "The list of features",
	url: "/respect/features.js",
	verify: function(){
		var options = {
			host: 'localhost',
			port: 8818,
			path: "/respect/features.js",
			method: 'GET'
		};
		var req = http.request(options,function(res) {
								console.log("STATUS: " + res.statusCode);	
								console.log("HEADERS: " + JSON.stringify(res.headers));	
								res.setEncoding('utf8');
								res.on('data', function(chunk) {
									console.log("BODY: " + chunk);
								});
							});		
		req.on('error', function(e) {
			console.log('Problem with request: ' + e.message);
		});
		req.end();
	}
};

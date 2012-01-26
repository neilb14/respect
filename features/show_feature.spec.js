describe('show feature', function() {
	it('should return an HTTP status of 200', function(){
		get("/respect/show_feature/show_feature.js", function(res,body){
			expect(res.statusCode).toEqual(200);
		});
	});

	it('should list all specs defined for the feature', function(){
    get("/respect/show_feature/show_feature.js", function(res, body){
			expect(body.title).toEqual("Dogfooding Respect");
			expect(body.feature).toEqual("show_feature");
			expect(body.specs.length).toEqual(3);
 		});
  });

	it('should provide a url that an HTTP POST may be sent to to run the specs', function() {
		get("/respect/show_feature/show_feature.js", function(res,body) {
			expect(body.runUrl).toEqual("/respect/feature/show_feature");
		});
	});
});

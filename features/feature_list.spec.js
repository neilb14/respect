describe('feature list', function() {
	it('should list all defined features', function(){
        get("/respect/features.js", function(res, body){
          expect(res.statusCode).toEqual(200);
					expect(body.title).toEqual("Dogfooding Respect");
					expect(body.features.length).toEqual(1);
    	});
	});
	
	it('should allow a user to view a specific feature', function() {
		get("/respect/features.js", function(res, body) {
			expect(body.features[0].name).toEqual("feature_list");
			expect(body.features[0].showUrl).toEqual("/respect/features/feature_list");
		});
	});
});

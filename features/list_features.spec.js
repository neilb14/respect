describe('list features', function() {
	it('should list all defined features', function(){
        get("/respect/list_features.js", function(res, body){
          expect(res.statusCode).toEqual(200);
					expect(body.title).toEqual("Dogfooding Respect");
					expect(body.features.length).toEqual(2); // change this to be greater than :-)
    	});
	});
	
	it('should allow a user to view a specific feature', function() {
		get("/respect/list_features.js", function(res, body) {
			expect(body.features[0].name).toEqual("list_features");
			expect(body.features[0].showUrl).toEqual("/respect/show_feature/list_features");
		});
	});
});

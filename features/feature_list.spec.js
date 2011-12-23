describe('feature list', function() {
	it('should list all defined features', function(){
        get("/respect/features.js", function(res, body){
          expect(res.statusCode).toEqual(200);
					expect(body.title).toEqual("Dogfooding Respect");
					expect(body.features).toContain("feature_list");
    	});
	});
});

describe('anything', function() {
	it('should get all features', function(){
		get("/respect/features.js", function(res, body){
            expect(res.status).toEqual(200);
			expect(body.title).toEqual("Dogfooding Respect");
		});
	});
});

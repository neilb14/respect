describe('anything', function() {
	it('should get all features', function(){
        get("/respect/features.js", function(res, body){
            expect(res.statusCode).toEqual(200);
    		expect(body.title).toEqual("Dogfooding Respect");
    	}, function(e){
            console.error(e.message);
        });
	});
});

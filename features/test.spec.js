describe('anything', function() {
	it('should get all features', function(){
		get("/respect/features.js", function(data){
			expect(data.title).toEqual("Dogfooding Respect");
		});
	});

	it('should fail', function() {
		var foo = 0;
		foo++;
		expect(foo).toEqual(1);
	});
});

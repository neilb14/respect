describe('show feature', function() {
	it('should list all specs', function(){
        get("/respect/show_feature/show_feature.js", function(res, body){
          expect(res.statusCode).toEqual(200);
					expect(body.title).toEqual("Dogfooding Respect");
					expect(body.feature).toEqual("show_feature");
					expect(body.runUrl).toEqual("/respect/feature/show_feature");
					expect(body.specs.length).toEqual(1);
   		});
   	});
});

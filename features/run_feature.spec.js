describe('run feature', function() {
	it('should return HTTP status code 200 when the feature was successfully run', function(){
			fail('Not sure how to POST (not sure how to POST)');
			// not sure how to fail either apparently :-)
      post("/respect/feature/run_feature.js", function(res, body){
          expect(res.statusCode).toEqual(200);
    	});
	});
});

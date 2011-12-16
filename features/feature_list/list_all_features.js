test = {
	description: "The list of features",
	url: "/respect/features.js",
	method: "GET",
	verify: function(res, data){
		console.log("Verifying: " + data);
		return "Pending";
	}
};

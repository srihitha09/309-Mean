'use strict';

module.exports = function(app) {
	var profiles = require('../../app/controllers/profiles.server.controller');
	
	app.route('/profiles')
		.get(profiles.list)
		.post(profiles.create);
	
	app.route('/profiles/:profileId')
		.get(profiles.read)
		.put(profiles.update)
		.delete(profiles.delete);
	
	// Finish by binding the article middleware
	// What's this? Where the commentId is present in the URL
	// the logic to 'get by id' is handled by this single function
	// and added to the request object i.e. request.comment.
	app.param('profileId', profiles.profileByID);
};
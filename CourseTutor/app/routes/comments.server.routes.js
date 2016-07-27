
'use strict';

module.exports = function(app) {
	var comments = require('../../app/controllers/comments.server.controller');
	
	app.route('/comments')
		.get(comments.list)
		.post(comments.create);

	app.route('/comments/:commentId')
		.get(comments.read)
		.put(comments.update)
		.delete(comments.delete);

	// Finish by binding the article middleware
	// What's this? Where the commentId is present in the URL
	// the logic to 'get by id' is handled by this single function
	// and added to the request object i.e. request.comment.
	app.param('commentId', comments.commentByID);
};
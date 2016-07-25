'use strict';

module.exports = function(app) {
	var contacts = require('../../app/controllers/contact.server.controller');
	var conversations = require('../../app/controllers/conversation.server.controller');

	app.route('/contact/create')
		// .get(function(req, res) {
		// 	res.json([{name:'test'}, {name: 'tes2'}]);
		// });
		.get(contacts.create);
		// .post(contacts.create);

	// app.route('/contact/:id')
	// 	.get(contacts.list);

	app.route('/contact/updateConversation?')
		.get(conversations.update);

	app.route('/contact/findContact?')
		.get(contacts.findExistOrCreate);
};
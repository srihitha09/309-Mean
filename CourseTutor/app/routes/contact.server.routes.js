'use strict';

module.exports = function(app) {
	var contacts = require('../../app/controllers/contact.server.controller');
	var conversations = require('../../app/controllers/conversation.server.controller');

	app.route('/contact/sendMessage?')
		.get(contacts.trySaveMessage);

	app.route('/contact/findContact?')
		.get(contacts.read);

	app.route('/contact/listContacts?')
		.get(contacts.list);
};
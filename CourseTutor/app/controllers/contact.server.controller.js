'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Contact = mongoose.model('Contact'),
	Conversation = mongoose.model('Conversation'),
    _ = require('lodash');

/**
 * This method creates contact for each user, and one conversation object.
 * OnError is called with input err when error occurs.
 * OnSuccess is currently called with an input of my contact object.
 */
function createContact(myId, myName, contactId, contactName, firstMessage, onError, onSuccess) {
	// create a conversation object
	var conversation = new Conversation();

	if (typeof firstMessage !== 'undefined' && firstMessage) {
		var historyObj = [{
			from: myName,
			to: contactName,
			body: firstMessage
		}];
		conversation.history = JSON.stringify(historyObj);
	}

	conversation.save(function(err) {
		if (err) {
			onError(err);
		} else {
			// when success, save contact obj
			var contact = new Contact({
				my_id: myId,
				my_name: myName,
				contact_id: contactId,
				contact_name: contactName,
				conversation_id: conversation._id
			});
			contact.save(function(err) {
				if (err) {
					onError(err);
				} else {
					// create a contact object for the other user
					var otherContact = new Contact({
						my_id: contactId,
						my_name: contactName,
						contact_id: myId,
						contact_name: myName,
						conversation_id: conversation._id
					});
					otherContact.save(function(err) {
						if (err) {
							onError(err);
						} else {
							onSuccess(contact);
						}
					});
				}
			});
		}
	});
}


/**
 * Create a Contact
 * example url:
 * create?my_id=val&my_name&contact_id=val&contact_name=val&message=val
 */
exports.create = function(req, res) {
	createContact(req.query.my_id, 
				  req.query.my_name,
				  req.query.contact_id,
				  req.query.contact_name,
				  req.query.message,
				  function(err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				  },
				  function(resultContact) {
				  	res.json(resultContact);
				  });
};

/**
 * Show the current Contact
 * example url:
 * create?my_id=val&contact_id=val
 */
exports.read = function(req, res) {
 	Contact.findOne({ my_id:req.query.my_id, contact_id:req.query.contact_id }).exec(function(err, contact) {
 		if (err) {
 			return res.status(400).send({
 				message: errorHandler.getErrorMessage(err)
 			});
 		} else {
 			console.log(contact);
 			res.json(contact);
 		}
 	});
};

/**
 * Try find a contact, if not exist, then create one
 * example url:
 * create?my_id=val&contact_id=val&contact_name=val&message=val
 */
exports.findExistOrCreate = function(req, res) {
	Contact.findOne({ my_id:req.query.my_id, contact_id:req.query.contact_id }).exec(function(err, contact) {
 		if (err) {
 			return res.status(400).send({
 				message: errorHandler.getErrorMessage(err)
 			});
 		} else {
 			if (contact === null) {
 				createContact(req.query.my_id, 
 							  req.query.my_name,
 							  req.query.contact_id,
 							  req.query.contact_name,
 							  req.query.message,
 							  function(err) {
								return res.status(400).send({
									message: errorHandler.getErrorMessage(err)
								});
							  },
 							  function(resultContact) {
 							  	res.json(resultContact);
 							  });
 			} else {
 				res.json(contact);
 			}
 		}
 	});
};

/**
 * Update a Contact
 */
exports.update = function(req, res) {

};

/**
 * Delete an Contact
 */
exports.delete = function(req, res) {

};

/**
 * List of Contacts
 */
exports.list = function(req, res) {
	Contact.find().exec(function(err, contacts){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(contacts);
		}
	});
};


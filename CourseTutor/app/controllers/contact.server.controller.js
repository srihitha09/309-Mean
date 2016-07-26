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
function createContactAndConversation(myId, myName, contactId, contactName, message, onError, onSuccess) {
	// create a conversation object
	var conversation = new Conversation();

	if (typeof message !== 'undefined' && message) {
		var historyObj = [{
			from: myName,
			to: contactName,
			body: message
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
						conversation_id: conversation._id,
						has_new_message: true
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
 * Update an existing conversation
 */
function updateConversation(conversation_id, whom_from, whom_to, message, onError, onSuccess) {
	Conversation.findById(conversation_id).exec(function(err, conversation) {
		if (err) {
			onError(err);
		} else {
			// TODO: handle failed case - conversation === null
			var history = JSON.parse(conversation.history);
			history.unshift({
				from: whom_from,
				to: whom_to,
				body: message
			});
			conversation.history = JSON.stringify(history);
			conversation.save(function(err) {
				if (err) {
					onError(err);
				} else {
					onSuccess(conversation);
				}
			});
		}
	});
}

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
 * Try save message to conversation.
 * If contact not exist, create one; if exist, update conversation
 * example url:
 * create?my_id=val&contact_id=val&contact_name=val&text=val
 */
exports.trySaveMessage = function(req, res) {
	Contact.findOne({ my_id:req.query.my_id, contact_id:req.query.contact_id }).exec(function(err, contact) {
 		if (err) {
 			return res.status(400).send({
 				message: errorHandler.getErrorMessage(err)
 			});
 		} else {
 			if (contact === null) {
 				createContactAndConversation(
 					req.query.my_id, 
 					req.query.my_name, 
 					req.query.contact_id, 
					req.query.contact_name,
					req.query.text,
					function(err) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					},
					function(resultConversation) {
					  	res.status(201).json(resultConversation);
					});
 			} else {
 				updateConversation(
 					contact.conversation_id, 
 					req.query.my_name, 
 					req.query.contact_name, 
 					req.query.text,
 					function(err) {
 						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
 					},
 					function(resultConversation) {
 						res.status(201).json(resultConversation);
 					});
 				
 				// next, update the has_new_message property of the contact
 				Contact.findOne({ my_id:req.query.contact_id, contact_id:req.query.my_id }).exec(function(err, contact) {
 					if (err || contact === null) {
 						return res.status(400).send({
 							message: errorHandler.getErrorMessage(err)
 						});
 					} else {
 						contact.has_new_message = true;
 						contact.save(function(err) {
							if (err) {
								return res.status(400).send({
									message: errorHandler.getErrorMessage(err)
								});
							}
						});
 					}
 				});
 			}
 		}
 	});
};

/**
 * Delete an Contact
 */
exports.delete = function(req, res) {

};

/**
 * List of Contacts of current user
 * example url:
 * create?my_id=val
 */
exports.list = function(req, res) {
	Contact.find({ my_id : req.query.my_id }).exec(function(err, contacts){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(contacts);
		}
	});
};


'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

function validateIdLength(id) {
	// objectId is a 12-byte object thus composed with 24 characters.
	return id.length === 24;
}

/**
 * Contact Schema
 * This must be created after a conversation is created, because a conversation ID is required.
 */
var ContactSchema = new Schema({
	my_id: {
		type: String,
		default: 'unknown_id',
		required: 'myId cannot be blank',
		validate: [validateIdLength, 'Invalid id length for myId'],
	},
	my_name: {
		type: String,
		default: 'Anonymous',
		trim: true
	},
	contact_id: {
		type: String,
		default: 'unknown_id',
		required: 'contactId cannot be blank',
		validate: [validateIdLength, 'Invalid id length for contact_id'],
	},
	contact_name: {
		type: String,
		default: 'Anonymous',
		trim: true,
	},
	conversation_id: {
		type: String,
		default: 'unknown_id',
		required: 'conversationId cannot be blank',
		validate: [validateIdLength, 'Invalid id length for conversation_id'],
	},
	has_new_message: {
		type: Boolean,
		default: false,
	}
});

mongoose.model('Contact', ContactSchema);
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Conversation Schema
 */
var ConversationSchema = new Schema({
	history: {
		type: String,
		default: '[]'
	}
});

mongoose.model('Conversation', ConversationSchema);
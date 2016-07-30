'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Conversation = mongoose.model('Conversation'),
    _ = require('lodash');

/**
 * Create a Conversation
 */
exports.create = function(req, res) {
	var conversation = new Conversation(req.body);
	conversation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(201).json(conversation);
		}
	});
};
 
/**
 * Show the current Conversation
 */
exports.read = function(req, res) {
	Conversation.findById(req.query.id).exec(function(err, conv) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(201).json(conv.history);
		}
	});
};

/**
 * Update a Conversation
 * Example URL:
 * updateConversation?id=val&from=val&to=val&message=val
 */
exports.update = function(req, res) {
	// console.log(req.query.id);
	Conversation.findById(req.query.id).exec(function(err, conv) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var history = JSON.parse(conv.history);
			history.unshift({
				from: req.query.from,
				to: req.query.to,
				body: req.query.message
			});
			conv.history = JSON.stringify(history);
			conv.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.status(201).json(conv);
				}
			});
		}
	});
};

/**
 * Delete an Conversation
 */
exports.delete = function(req, res) {

};

/**
 * List of Conversations
 */
exports.list = function(req, res) {

};
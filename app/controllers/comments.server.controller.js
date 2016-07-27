'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Comment = mongoose.model('Comment'),
    _ = require('lodash');

/**
 * Create a Comment
 */
exports.create = function(req, res) {
	var comment = new Comment(req.body);
	comment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(201).json(comment);
		}
	});
};

/**
 * Show the current Comment
 */
exports.read = function(req, res) {
	res.json(req.comment);
};

/**
 * Update a Comment
 */
exports.update = function(req, res) {
	var comment = req.comment;

	comment = _.extend(comment, req.body);

	comment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(comment);
		}
	});
};

/**
 * Delete an Comment
 */
exports.delete = function(req, res) {
	var comment = req.comment;

	comment.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(comment);
		}
	});
};

/**
 * List of Categories
 */
exports.list = function(req, res) {
	Comment.find().sort('name').exec(function(err, comments) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(comments);
		}
	});
};

/**
 * Comment middleware
 */
exports.commentByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Comment is invalid'
		});
	}

	Comment.findById(id).exec(function(err, comment) {
		if (err) return next(err);
		if (!comment) {
			return res.status(404).send({
  				message: 'Comment not found'
  			});
		}
		req.comment = comment;
		next();
	});
};

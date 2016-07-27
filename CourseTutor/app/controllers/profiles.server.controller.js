'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Profile = mongoose.model('Profile'),
    _ = require('lodash');

/**
 * Create a Profile
 */
exports.create = function(req, res) {
	var profile = new Profile(req.body);
	profile.save();
};

/**
 * Show the current profile
 */
exports.read = function(req, res) {
	res.json(req.profile);
};

/**
 * Update a profile
 */
exports.update = function(req, res) {
	//req.profile.fir
	var profile = req.profile;

	profile = _.extend(profile, req.body);

	profile.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(profile);
		}
	});
};

/**
 * Delete a profile
 */
exports.delete = function(req, res) {
	var profile = req.profile;

	profile.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(profile);
		}
	});
};

/**
 * List of Profiles
 */
exports.list = function(req, res) {
	Profile.find().sort('name').exec(function(err, profiles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(profiles);
		}
	});
};

/**
 * Profile middleware
 */
exports.profileByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Profile is invalid'
		});
	}

	Profile.findById(id).exec(function(err, profile) {
		if (err) return next(err);
		if (!profile) {
			return res.status(404).send({
  				message: 'Comment not found'
  			});
		}
		req.profile = profile;
		next();
	});
};


'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	Course = mongoose.model('Course');

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;
	var courseName = req.body.courses;
	var courseId;

	// For security measurement we remove the roles from the req.body object
	//delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;
		user.courses = [];

		Course.findOne({'name':courseName}).exec(function(err, coursesFound) {
		if (err) {
			return res.status(400).send({
				message: 'Cannot find course'
			});
		} else {
			if (coursesFound === null){
				return res.status(400).send({
					message: 'Cannot find course'
				});
			}
			else{
				courseId = coursesFound._id;
				user.courses.push(courseId);
				user.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: 'Cannot add course'
					});
				} else {
					req.login(user, function(err) {
						if (err) {
							res.status(400).send(err);
						} else {
							res.json(user);
						}
					});
				}
				console.log(user.courses);
				//console.log(courseName);
			});
			}
			
		}
		});
		//console.log(courseId);
		

		
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Update user details
 */
exports.updateCourses = function(req, res) {

	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	//delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.courses.push(req.body.courses);

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
			console.log(user.courses);
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * List of Courses
 */
exports.findAll = function(req, res) {
	User.find().sort('username').exec(function(err, user) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(user);
		}
	});
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};
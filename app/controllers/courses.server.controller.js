'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Course = mongoose.model('Course'),
    _ = require('lodash');

/**
 * Create a Course
 */
exports.create = function(req, res) {
	var course = new Course(req.body);

	course.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(201).json(course);
		}
	});
};

/**
 * Show the current Course
 */
exports.read = function(req, res) {
	res.json(req.course);
};

/**
 * Update a Course
 */
exports.update = function(req, res) {
	var course = req.course;

	course = _.extend(course, req.body);

	course.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(course);
		}
	});
};

/**
 * Delete an Course
 */
exports.delete = function(req, res) {
	var course = req.course;

	course.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(course);
		}
	});
};

/**
 * List of Courses
 */
exports.list = function(req, res) {
	Course.find().sort('name').exec(function(err, courses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(courses);
		}
	});
};

/**
 * Course middleware
 */
exports.courseByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Course is invalid'
		});
	}

	Course.findById(id).exec(function(err, course) {
		if (err) return next(err);
		if (!course) {
			return res.status(404).send({
  				message: 'Course not found'
  			});
		}
		req.course = course;
		next();
	});
};
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Course Schema
 */
var CourseSchema = new Schema({
	// Course model fields   
	// ...
	created: {
		type: Date,
		default: Date.now
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	name: {
		type: String,
		default: '',
		trim: true,
		unique: true,
		required: 'name cannot be blank'
	},
	program: {
		type: String,
		default: '',
		trim: true
	},
	school: {
		type: String,
		default: '',
		trim: true
	},
	year: {
		type: Number,
		default: 2016
	}
});

mongoose.model('Course', CourseSchema);
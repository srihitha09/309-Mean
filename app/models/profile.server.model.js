'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Profile Schema
 */
var ProfileSchema = new Schema({
	// Profile model fields   
	displayName: {
		type: String,
		trim: true
	},
	firstName: {
		type: String,
		default: ''
	},
	lastName: {
		type: String,
		default: ''
	},
	email: {
		type: String,
		trim: true,
		default: ''
	},
	username: {
		type: String,
		unique: 'testing error message',
		required: 'Please fill in a username',
		trim: true
	},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin', 'tutor', 'student']
		}],
		default: ['user']
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	school: {
		type: String,
		trim: true,
		default: '',
	},
	program: {
		type: String,
		trim: true,
		default: '',
	},
	aboutMe: {
		type: String,
		//trim: true,
		default: ''
	},
	courses: {
		type: Array,
		trim: true,
		default: []
	},
	friends: {
		type: Array,
		//trim: true,
		default: []
	},
	userId: {
		type: String,
		unique: true
	}
});

mongoose.model('Profile', ProfileSchema);
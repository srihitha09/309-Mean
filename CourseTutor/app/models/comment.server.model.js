'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
  body: String,
  author: String,
  upvotes: {type: Number, default: 0},
  course: String
});

CommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

CommentSchema.methods.downvote = function(cb) {
  this.upvotes -= 1;
  this.save(cb);
};


mongoose.model('Comment', CommentSchema);
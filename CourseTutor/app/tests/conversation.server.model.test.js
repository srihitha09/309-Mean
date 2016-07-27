'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Conversation = mongoose.model('Conversation');

/**
 * Globals
 */
var user, conversation;

/**
 * Unit tests
 */
describe('Conversation Model Unit Tests:', function() {
	describe('Saving', function() {
        it('saves new record', function(done) {
            var conversation = new Conversation({
                name: 'CSC309',
                description: 'Programming on the web'
            });

            conversation.save(function(err, saved) {
                should.not.exist(err);
                done();
            });
        });

        /*it('throws validation error when name is empty', function(done) {   
            var conversation = new Conversation({
                description: 'Intro to CS'
            });

            conversation.save(function(err) {
                should.exist(err);
                err.errors.name.message.should.equal('name cannot be blank');
                done();
            });
        });*/
    });

	afterEach(function(done) { 
		Conversation.remove().exec();
		User.remove().exec();

		done();
	});
});
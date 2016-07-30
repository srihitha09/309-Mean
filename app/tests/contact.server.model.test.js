'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Contact = mongoose.model('Contact');

/**
 * Globals
 */
var user, contact;

/**
 * Unit tests
 */
describe('Contact Model Unit Tests:', function() {
	describe('Saving', function() {
        it('saves new record', function(done) {
            var contact = new Contact({
                name: 'CSC309',
                description: 'Programming on the web'
            });

            contact.save(function(err, saved) {
                should.not.exist(err);
                done();
            });
        });

        /*it('throws validation error when name is empty', function(done) {   
            var contact = new Contact({
                description: 'Intro to CS'
            });

            contact.save(function(err) {
                should.exist(err);
                err.errors.name.message.should.equal('name cannot be blank');
                done();
            });
        });*/
    });

	afterEach(function(done) { 
		Contact.remove().exec();
		User.remove().exec();

		done();
	});
});
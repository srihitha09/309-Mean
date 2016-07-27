'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Comment = mongoose.model('Comment');

/**
 * Globals
 */
var user, comment;

/**
 * Unit tests
 */
describe('Comment Model Unit Tests:', function() {
	describe('Saving', function() {
        it('saves new record', function(done) {
            var comment = new Comment({
                body: 'New comment'
            });

            comment.save(function(err, saved) {
                should.not.exist(err);
                done();
            });
        });

       

       /* it('throws validation error when name longer than 15 chars', function(done) {
            var comment = new Comment({
                name: 'Grains/Cereals/Chocolates'
            });

            comment.save(function(err, saved) {
                should.exist(err);
                err.errors.name.message.should.equal('name must be 15 chars in length or less');
                done();
            });
        });
*/
/*        it('throws validation error for duplicate comment name', function(done) {
            var comment = new Comment({
                name: 'Beverages'
            });

            comment.save(function(err) {
                should.not.exist(err);

                var duplicate = new Comment({
                    name: 'Beverages'
                });

                duplicate.save(function(err) {
                    err.err.indexOf('$name').should.not.equal(-1);
                    err.err.indexOf('duplicate key error').should.not.equal(-1);
                    should.exist(err);
                    done();
                });
            });
        });*/
    });
	afterEach(function(done) { 
		Comment.remove().exec();
		User.remove().exec();

		done();
	});
});
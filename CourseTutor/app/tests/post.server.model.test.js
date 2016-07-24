'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Post = mongoose.model('Post');

/**
 * Unit tests
 */
describe('Post Model', function() {

    describe('Saving', function() {
        it('saves new record', function(done) {
            var post = new Post({
                title: 'Hi'
            });

            post.save(function(err, saved) {
                should.not.exist(err);
                done();
            });
        });

    });

    afterEach(function(done) { 
        // NB this deletes ALL categories (but is run against a test database)
        Post.remove().exec();
        done();
    });
});

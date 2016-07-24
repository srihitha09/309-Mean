'use strict';

module.exports = {
	db: 'mongodb://localhost/coursetutor-dev',
	app: {
		title: 'CourseTutor - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '312796959052913',
		clientSecret: process.env.FACEBOOK_SECRET || '0a9ba4f8a8f1804fe99c992a57e41b96',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '362237945408-b93v1ji03g0ld1atpe9ach23fk6k9vjb.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'A2NAPVsxLSHwOIJ1qi-JI8ZL',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};

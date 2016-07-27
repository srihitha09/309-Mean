'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		/*
		state('editProfile', {
			url: '/profile/:profileId',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/profile.client.view.html'
		}).
		state('profileCourses', {
			url: '/settings/profileCourses',
			templateUrl: 'modules/users/views/settings/profileCourses.client.view.html'
		}).
		state('profileFriends', {
			url: '/settings/profileFriends',
			templateUrl: 'modules/users/views/settings/profileFriends.client.view.html'
		}).
		*/
		state('profile', {
			url: '/profile/:profileId',
			templateUrl: 'modules/profile/views/profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('resources', {
			url: '/settings/resources',
			templateUrl: 'modules/users/views/settings/resources.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
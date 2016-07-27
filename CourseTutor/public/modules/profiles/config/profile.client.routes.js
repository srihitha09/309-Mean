'use strict';

//Setting up route
angular.module('profiles').config(['$stateProvider',
	function($stateProvider) {
		// Profiles state routing
		$stateProvider.
		state('listProfiles', {
			url: '/profiles',
			templateUrl: 'modules/profiles/views/profile.client.view.html'
		}).
		state('viewProfile', {
			url: '/profiles/:profileId',
			templateUrl: 'modules/profiles/views/profile.client.view.html'
		}).
		state('editProfile', {
			url: '/profiles/:profileId/edit',
			templateUrl: 'modules/profiles/views/edit-profile.client.view.html'
		}).
		state('profileFriends', {
			url: '/profiles/:profileId/friends',
			templateUrl: 'modules/profiles/views/profileFriends.client.view.html'
		}).
		state('profileCourses', {
			url: '/profiles/:profileId/courses',
			templateUrl: 'modules/profiles/views/profileCourses.client.view.html'
		});
	}
]);
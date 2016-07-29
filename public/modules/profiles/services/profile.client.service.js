'use strict';

//Profiles service used to communicate Comments REST endpoints
angular.module('profiles').factory('Profiles', ['$resource',
	function($resource) {
		return $resource('profiles/:profileId', { profileId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
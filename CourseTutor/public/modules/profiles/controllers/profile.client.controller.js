'use strict';

// profiles controller
angular.module('profiles').controller('ProfilesController', ['$scope', '$stateParams', '$location', '$window', 'Authentication', 'Profiles',
	function($scope, $stateParams, $location, $window, Authentication, Profiles) {
		$scope.authentication = Authentication;
	  	$scope.currentPage = 1;
	  	$scope.pageSize = 10;
	  	$scope.offset = 0;

	   // Page changed handler
	   $scope.pageChanged = function() {
	  		$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
	   };

		// Create new Profile
		$scope.create = function() {
			// Create new Profile object
			var profile = new Profiles ({
				username: $scope.authentication.user.username,
				firstName: $scope.authentication.user.firstName,
				lastName: $scope.authentication.user.lastName,
				email: $scope.authentication.user.email,
				school: $scope.authentication.user.school,
				program: $scope.authentication.user.program
			});

			// Redirect after save by reload
			profile.$save(function(response) {
				// Clear form fields
				$scope.author = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Profile
		$scope.remove = function(profile) {
			if ( profile ) { 
				profile.$remove();

				for (var i in $scope.profiles) {
					if ($scope.profiles [i] === profile) {
						$scope.profiles.splice(i, 1);
					}
				}
			} else {
				$scope.profile.$remove(function() {
					$location.path('profiles');
				});
			}
		};

		// Update existing profile
		$scope.update = function() {
			var profile = $scope.profile;

			profile.$update(function() {
				$location.path('profiles/' + profile._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of profiles
		$scope.find = function() {
			$scope.profiles = Profiles.query();
		};

		// Find existing profile
		$scope.findOne = function() {
			$scope.profile = Profiles.get({ 
				profileId: $stateParams.profileId
			});
		};

		// Search for a profile
		$scope.profileSearch = function(product) {
			$location.path('profiles/' + product._id);
		};

			$scope.addCourse = function(profile){

			// need to add person to both friends list 
			
			profile.courses.push($scope.course);

			profile.$update(function() {
				$location.path('profiles/' + profile._id);
			}, function(errorResponse) {
				//$scope.error = errorResponse.data.message;
				$scope.error = "Unable to add course";
			});
			
		};

		$scope.addFriend = function(profile){

			// need to add person to both friends list 
			
			profile.friends.push($scope.authentication.user.username);

			profile.$update(function() {
				$location.path('profiles/' + profile._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			
		};

	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication', '$window',
	function($scope, $http, $location, Authentication, $window) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.roles = ['tutor', 'student'];

		$scope.signup = function() {
			//if ($scope.credentials.roles)
			
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model

				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
				$window.location.reload();
				$window.location.reload();
				console.log($scope.credentials.roles);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.stateChanged = function(checkbox){
			 if($scope.authentication.user.checkboxModel.tutor === true){ //If it is checked
       			alert('test');
   			}
		};

		$scope.signin = function() {
			//console.log($scope.credentials);
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
				$window.location.reload();
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
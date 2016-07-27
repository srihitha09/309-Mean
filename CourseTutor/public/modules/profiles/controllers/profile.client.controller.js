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
				displayName: $scope.authentication.user.displayName,
				email: $scope.authentication.user.email,
				school: $scope.authentication.user.school,
				program: $scope.authentication.user.program,
				userId: $scope.authentication.user._id
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
				$scope.error = errorResponse.data.message;
				//$scope.error = "Unable to add course";

				//$scope.error = errorResponse.data.message;
				$scope.error = 'Unable to add course';
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

		$scope.sendMessage = function() {
			if (typeof $scope.input_message !== 'undefined' && $scope.input_message.length > 0) {
				var messageUrl = '/contact/sendMessage?my_id='+$scope.authentication.user._id
						+'&my_name='+$scope.authentication.user.displayName
						+'&contact_id='+$scope.profile.userId
						+'&contact_name='+$scope.profile.displayName
						+'&text='+$scope.input_message;
				$.ajax({
					url: messageUrl,
					method: 'POST',
					success: function() {
						$('textarea.post_message_textarea').val('');
						var $alert_post_sending = $('p#alert_post_sending');
						$alert_post_sending.css('color', '#326C32');
						$alert_post_sending.html('Message sent!');
						$alert_post_sending.show();
					}
				});
			} else {
				var $alert_post_sending = $('p#alert_post_sending');
				$alert_post_sending.css('color', '#E32F35');
				$alert_post_sending.html('Please type something before send?');
				$alert_post_sending.show();
			}
		};

		// display the send message page when clicking on 'message button'
		$scope.showMessageBox = function() {
			// clean up
			$('textarea.post_message_textarea').val('');
			$('p#alert_post_sending').hide();
			// hide and show
			$('section#about').hide();
			$('section#send_message_wrapper').show();
		};

		$scope.hideMessageBox = function() {
			// clean up
			$('textarea.post_message_textarea').val('');
			$('p#alert_post_sending').hide();
			// hide and show
			$('section#about').show();
			$('section#send_message_wrapper').hide();
		};

	}
]);
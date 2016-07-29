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

		$scope.showAbout = function() {
			$('article#content > :not(#about)').hide();
			$('section#about').show();
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

		$scope.showContacts = function() {
			var listUrl = '/contact/listContacts?my_id='+$scope.authentication.user._id;
			$.ajax({
				url: listUrl,
				method: 'GET',
				success: function(contactList) {
					var $wrapper = $('section#contacts_wrapper');
					var i=0; 
					while(i<contactList.length) {
						var newMessageAlert = '';
						if (!contactList[i].has_new_message) {
							newMessageAlert = 'New message!';
						}
						var $item = $('<section/>', {
							style: 'display: flex; margin-left: 10px; background-color: #f6f9fb; cursor: pointer; text-align: left;'
						});
						$item.append($('<img/>', {
							src: '/modules/profiles/img/talk_blue.png',
							style: 'width: 50px; height: 50px; margin: 10px;'
						}));
						var $item_info_wrap = $('<section/>');
						$item_info_wrap.append($('<p/>', {
							text: contactList[i].contact_name,
							style: 'font-size: 20px; margin: 15px 0 0 0;'
						}));
						$item_info_wrap.append($('<p/>', {
							text: newMessageAlert,
							style: 'margin: 0; color: red;'
						}));
						$item.append($item_info_wrap);
						$item.on('click', {id : contactList[i].conversation_id} ,showChatWithContact);
						$wrapper.append($item);

						i++;
					}
				}
			});

			$('section#about').hide();
			$('section#contacts_wrapper').show();
		};

		function showChatWithContact(event) {
			var fetchConversationUrl = '/contact/getChatHistory?conv_id='+event.data.id;
			$.ajax({
				url: fetchConversationUrl,
				method: 'GET',
				success: function(history) {
					// history is a list of objects representing each message
					// Each object has three properties.
					// from: name of the person sent this message
					// to: name of the person receives this message
					// body: message content
					// timestamp: timestamp of this message
					var i=0;
					while (i<history.length) {
						var $wrapper = $('section#chat_wrapper');

						var styleString = '';
						var imgFileName = '';
						if (history[i].from === $scope.authentication.user.displayName) {
							styleString = 'text-align: right; flex-direction: row-reverse;';
							imgFileName = 'talk_green.png';
						} else {
							styleString = 'text-align: left; flex-direction: row;';
							imgFileName = 'talk_blue.png';
						}

						var $item = $('<section/>', {
							style: 'display: flex; margin-left: 10px; background-color: #f6f9fb; '+styleString
						});
						$item.append($('<img/>', {
							src: '/modules/profiles/img/'+imgFileName,
							style: 'width: 40px; height: 40px; margin: 10px;'
						}));

						var $item_content_wrap = $('<section/>');
						$item_content_wrap.append($('<p/>', {
							text: history[i].from,
							style: 'font-size: 20px; margin: 15px 0 0 0;'
						}));
						$item_content_wrap.append($('<p/>', {
							text: history[i].timestamp,
							style: 'font-size: 10px; margin: 0;'
						}));
						$item_content_wrap.append($('<p/>', {
							text: history[i].body,
							style: 'margin: 0;'
						}));

						$item.append($item_content_wrap);
						$wrapper.append($item);

						i++;
					}

					$('section#contacts_wrapper').hide();
					$('section#chat_wrapper').show();
					console.log(history);
				}
			});
		}

	}
]);
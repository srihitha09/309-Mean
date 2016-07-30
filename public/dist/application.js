'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'coursetutor';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('comments');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('courses');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('profiles');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Configuring the Articles module
angular.module('comments').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('topbar', 'Comments', 'comments', 'dropdown', '/comments(/create)?');
		Menus.addSubMenuItem('topbar', 'comments', 'List Comments', 'comments');
		Menus.addSubMenuItem('topbar', 'comments', 'New Comment', 'comments/create');*/
	}
]);
'use strict';

//Setting up route
angular.module('comments').config(['$stateProvider',
	function($stateProvider) {
		// Comments state routing
		$stateProvider.
		state('listComments', {
			url: '/comments',
			templateUrl: 'modules/comments/views/comments.client.view.html'
		}).
		state('createComment', {
			url: '/comments/create',
			templateUrl: 'modules/comments/views/create-comment.client.view.html'
		}).
		state('viewComment', {
			url: '/comments/:commentId',
			templateUrl: 'modules/comments/views/view-comment.client.view.html'
		}).
		state('editComment', {
			url: '/comments/:commentId/edit',
			templateUrl: 'modules/comments/views/edit-comment.client.view.html'
		});
	}
]);
'use strict';

// Comments controller
angular.module('comments').controller('CommentsController', ['$scope', '$stateParams', '$location', '$window', 'Authentication', 'Comments',
	function($scope, $stateParams, $location, $window, Authentication, Comments) {
		$scope.authentication = Authentication;
	  	$scope.currentPage = 1;
	  	$scope.pageSize = 10;
	  	$scope.offset = 0;

	   // Page changed handler
	   $scope.pageChanged = function() {
	  		$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
	   };

		// Create new Comment
		$scope.create = function() {
			// Create new Comment object
			var comment = new Comments ({
				author: $scope.authentication.user.username,
				body: this.body,
				course: $scope.course._id
			});

			// Redirect after save by reload
			comment.$save(function(response) {
				$window.location.reload();
				// Clear form fields
				$scope.author = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Comment
		$scope.remove = function(comment) {
			if ( comment ) { 
				comment.$remove();

				for (var i in $scope.comments) {
					if ($scope.comments [i] === comment) {
						$scope.comments.splice(i, 1);
					}
				}
			} else {
				$scope.comment.$remove(function() {
					$location.path('comments');
				});
			}
		};

		// Update existing Comment
		$scope.update = function() {
			var comment = $scope.comment;

			comment.$update(function() {
				$location.path('comments/' + comment._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Comments
		$scope.find = function() {
			$scope.comments = Comments.query();
		};

		// Find existing Comment
		$scope.findOne = function() {
			$scope.comment = Comments.get({ 
				commentId: $stateParams.commentId
			});
		};

		// Search for a comment
		$scope.commentSearch = function(product) {
			$location.path('comments/' + product._id);
		};

		$scope.upvote = function(comment){
			// Check if guy already downvoted, need to reupdate the voters list
			var index = comment.downvoters.indexOf($scope.authentication.user.username);
			if (index !== -1){
				comment.downvoters.splice(index, 1);
			}
			comment.upvotes++;
			comment.upvoters.push($scope.authentication.user.username);
			comment.$update(function() {
				$location.path('comments/' + comment._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.downvote = function(comment){
			// Check if guy already upvoted, need to reupdate the voters list
			var index = comment.upvoters.indexOf($scope.authentication.user.username);
			if (index !== -1){
				comment.upvoters.splice(index, 1);
			}
			comment.upvotes--;
			comment.downvoters.push($scope.authentication.user.username);
			comment.$update(function() {
				$location.path('comments/' + comment._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
'use strict';

//Comments service used to communicate Comments REST endpoints
angular.module('comments').factory('Comments', ['$resource',
	function($resource) {
		return $resource('comments/:commentId', { commentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Configuring the Articles module
angular.module('courses').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Courses', 'courses', 'dropdown', '/courses(/create)?');
		Menus.addSubMenuItem('topbar', 'courses', 'List Courses', 'courses');
		Menus.addSubMenuItem('topbar', 'courses', 'New Course', 'courses/create');
	}
]);
'use strict';

//Setting up route
angular.module('courses').config(['$stateProvider',
	function($stateProvider) {
		// Courses state routing
		$stateProvider.
		state('listCourses', {
			url: '/courses',
			templateUrl: 'modules/courses/views/courses.client.view.html'
		}).
		state('createCourse', {
			url: '/courses/create',
			templateUrl: 'modules/courses/views/create-course.client.view.html'
		}).
		state('viewCourse', {
			url: '/courses/:courseId',
			templateUrl: 'modules/courses/views/view-course.client.view.html'
		}).
		state('editCourse', {
			url: '/courses/:courseId/edit',
			templateUrl: 'modules/courses/views/edit-course.client.view.html'
		});
	}
]);
'use strict';

// Courses controller
angular.module('courses').controller('CoursesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Courses',
	function($scope, $stateParams, $location, Authentication, Courses) {
		$scope.authentication = Authentication;
	  	$scope.currentPage = 1;
	  	$scope.pageSize = 10;
	  	$scope.offset = 0;

	   // Page changed handler
	   $scope.pageChanged = function() {
	  		$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
	   };

		// Create new Course
		$scope.create = function() {
			// Create new Course object
			var course = new Courses ({
				name: this.name,
				description: this.description
			});

			// Redirect after save
			course.$save(function(response) {
				$location.path('courses/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Course
		$scope.remove = function(course) {
			if ( course ) { 
				course.$remove();

				for (var i in $scope.courses) {
					if ($scope.courses [i] === course) {
						$scope.courses.splice(i, 1);
					}
				}
			} else {
				$scope.course.$remove(function() {
					$location.path('courses');
				});
			}
		};

		// Update existing Course
		$scope.update = function() {
			var course = $scope.course;

			course.$update(function() {
				$location.path('courses/' + course._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Courses
		$scope.find = function() {
			$scope.courses = Courses.query();
		};

		// Find existing Course
		$scope.findOne = function() {
			$scope.course = Courses.get({ 
				courseId: $stateParams.courseId
			});
		};

		// Search for a course
		$scope.courseSearch = function(product) {
			$location.path('courses/' + product._id);
		};
	}
]);
'use strict';

//Courses service used to communicate Courses REST endpoints
angular.module('courses').factory('Courses', ['$resource',
	function($resource) {
		return $resource('courses/:courseId', { courseId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('profiles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		/*Menus.addMenuItem('topbar', 'Comments', 'comments', 'dropdown', '/comments(/create)?');
		Menus.addSubMenuItem('topbar', 'comments', 'List Comments', 'comments');
		Menus.addSubMenuItem('topbar', 'comments', 'New Comment', 'comments/create');*/
	}
]);
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
'use strict';

// These two variables exist for the chat system. Too long to explain...
// Basically we need these values to send message to the correct contact
var activeContactId;
var activeContactName;

// profiles controller
angular.module('profiles').controller('ProfilesController', ['$scope', '$stateParams', '$location', '$window', 'Authentication', 'Profiles',
	function($scope, $stateParams, $location, $window, Authentication, Profiles) {
		$scope.authentication = Authentication;
	  	$scope.currentPage = 1;
	  	$scope.pageSize = 10;
	  	$scope.offset = 0;

	  	// A helper function to show only one element inside 
		// <article class="profile-content" id="content">
		function showElementAndHideOthers(element_id) {
			$('article#content > :not('+element_id+')').hide();
			$(element_id).show();
		}

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

		$scope.addCourse = function(profile, product){

			console.log(profile.courses);
			console.log(product.name);
			// Check if they already have the course, no duplicates
			if (profile.courses.indexOf(product.name) != -1){
				alert("This course is already in your list!");
			}
			else{
				profile.courses.push(product.name);
			}

			profile.$update(function() {
				$location.path('profiles/' + profile._id + '/courses');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
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
			showElementAndHideOthers('section#about');
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
			showElementAndHideOthers('section#send_message_wrapper');
		};

		$scope.hideMessageBox = function() {
			// clean up
			$('textarea.post_message_textarea').val('');
			$('p#alert_post_sending').hide();
			// hide and show
			showElementAndHideOthers('section#about');
		};

		$scope.showContacts = function() {
			var listUrl = '/contact/listContacts?my_id='+$scope.authentication.user._id;
			$.ajax({
				url: listUrl,
				method: 'GET',
				success: function(contactList) {
					var $wrapper = $('section#contacts_wrapper');
					$wrapper.empty();
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
						$item.on('click', {
							conv_id : contactList[i].conversation_id,
							user_id : contactList[i].contact_id, 
							user_name : contactList[i].contact_name
						} , showChatWithContact);
						$wrapper.append($item);

						i++;
					}
				}
			});

			showElementAndHideOthers('section#contacts_wrapper');
		};

		function refreshChatView(history) {
			// history is a list of objects representing each message
			// Each object has three properties.
			// from: name of the person sent this message
			// to: name of the person receives this message
			// body: message content
			// timestamp: timestamp of this message
			$('section.chat_message').remove();
			var $wrapper = $('section#chat_wrapper');
			var i=0;
			while (i<history.length) {
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
					class: 'chat_message',
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
		}

		function showChatWithContact(event) {
			var fetchConversationUrl = '/contact/getChatHistory?conv_id='+event.data.conv_id;
			activeContactId = event.data.user_id;
			activeContactName = event.data.user_name;
			console.log($scope);
			$.ajax({
				url: fetchConversationUrl,
				method: 'GET',
				success: function(history) {
					refreshChatView(history);
					showElementAndHideOthers('section#chat_wrapper');
				}
			});
		}

		$scope.sendMessageInChat = function() {
			if (typeof $scope.input_message !== 'undefined' && $scope.input_message.length > 0) {
				var messageUrl = '/contact/sendMessage?my_id='+$scope.authentication.user._id
						+'&my_name='+$scope.authentication.user.displayName
						+'&contact_id='+activeContactId
						+'&contact_name='+activeContactName
						+'&text='+$scope.input_message;
				console.log(messageUrl);
				$.ajax({
					url: messageUrl,
					method: 'POST',
					success: function(history) {
						$('textarea.post_message_textarea').val('');
						refreshChatView(history);
					}
				});
			}
		};

	}
]);
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
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
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
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			//if ($scope.credentials.roles)
		//	console.log($scope.credentials);
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model

				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
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
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', '$window', 'Users', 'Authentication',
	function($scope, $http, $location, $window, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);
				console.log(user.courses);
				console.log($scope.course);
				//user.courses.push($scope.course);


				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
			$scope.user.courses = '';
			//console.log($scope.course);
			console.log($scope.user.courses);
		};

		// Update a user profile
		$scope.updateUserCourses = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				//var user = new Users($scope.user);

				//$scope.user.courses.push($scope.course);

				var user= new Users ({
				courses: $scope.course
			});

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
					$scope.user.courses = '';			
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
				$scope.user.courses = '';
			}
			console.log($scope.course);
			console.log($scope.user.courses);
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
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
	}
]);
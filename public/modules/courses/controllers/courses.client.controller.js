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
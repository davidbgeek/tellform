'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$location', '$state', '$rootScope', 'User', 'Auth',
	function($scope, $location, $state, $rootScope, User, Auth) {

		$scope = $rootScope;
		$scope.credentials = {};
		$scope.error = '';

	    $scope.signin = function() {
			User.login($scope.credentials).then(
				function(response) {
					Auth.login(response);
					$scope.user = $rootScope.user = Auth.ensureHasCurrentUser(User);

					if($state.previous.name !== 'home' && $state.previous.name !== 'verify' && $state.previous.name !== ''){
						$state.go($state.previous.name);
					}else{
						$state.go('listForms');
					}
				},
				function(error) {
					$rootScope.user = Auth.ensureHasCurrentUser(User);
					$scope.user = $rootScope.user;

					$scope.error = error;
					console.log('loginError: '+error);
				}
			);
	    };

	    $scope.signup = function() {
			console.log($scope.credentials);
	        User.signup($scope.credentials).then(
		        function(response) {
		        	console.log('signup-success');
		        	$state.go('signup-success');
		        },
		        function(error) {
		        	console.log('Error: ');
		        	console.log(error);
					if(error) {
						$scope.error = error;
						console.log(error);
					}else {
						console.log('No response received');
					}
		        }
		    );
	    };

 	}
]);

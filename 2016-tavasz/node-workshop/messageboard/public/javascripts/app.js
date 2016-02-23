
(function () {
    var app = angular.module('messageBoard', ['ngRoute','ngAnimate']).config(['$locationProvider', function ($locationProvider) {
	$locationProvider.html5Mode(true);
    }]);
  

	app.controller('PostController', function ($scope, $route, $routeParams, $location, $http) {
    	
    	$http.get('board').
            success(function (data) {
            $scope.posts = data;
        });
        
    
      	$scope.clearForm = function() {
    	    $scope.name = null;
    	    $scope.message = null;
	} 

        $scope.addNewPost = function (name, message) {
            var data = {};
            data.name = name;
            data.message = message;
            $http.post('board/add', JSON.stringify(data)).
                success($scope.update);
            $scope.clearForm();
        }

        $scope.update = function () {
            $http.get('board').
                success(function (data) {
                $scope.posts = data;
            });
        };

        $scope.commentOnPost = function (postId, comment) {
            var data = JSON.stringify({postId: postId, comment:comment});
            $http.post('board/comment', data).
                success($scope.update);
        }

        $scope.likePost = function (postId) {
            var data = JSON.stringify({postId: postId});
            $http.post('board/like', data).
                success($scope.update);
        }

    	$scope.data = {
            repeatSelect: null,
       	    availableOptions: []
    	};
  });
})();









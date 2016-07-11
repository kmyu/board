
var newCtrl = angular.module('newCtrlModule',[]);

newCtrl.service('postService',['$http', function($http){
		return {
			post: function(url, data) {
				console.log(url);
				return $http.post(url, data);
			}
		}
	}]);

newCtrl.controller('newCtrl',function($scope, $state, postService){
	$scope.message = 'hi this is newCtrl';

	$scope.doc = {};

	$scope.onFormSubmit = function () {

		console.log('submit! ',$scope.doc);
		if($scope.doc.title) {
			//$state.href('/api' , $scope.doc);
			//$state.href('/boardList');

			var date = new Date();
			$scope.doc.createDate = date.getFullYear() + '/' +(date.getMonth() + 1) + '/' + date.getDate(); 
			
			postService.post('/api',$scope.doc).then(function(response){
					//$scope.docs = response.data;
					console.log($scope.doc);
					$state.go('list');
			})
		}
	};

});
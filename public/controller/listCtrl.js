
var listCtrl = angular.module('listCtrlModule',[]);
listCtrl.service("getService",['$http', function($http){
		return {
			get: function(url) {
				console.log(url);
				return $http.get(url);
			}
		}
	}]);
listCtrl.controller('listCtrl',function($scope, $state, getService){
	$scope.message = 'hi this is listCtrl';


	$scope.showDetail = function(id) {
		console.log('click id : ' + id);
		$state.go('detail',{'id':id});
	}

	getService.get("/api").then(function(response){
		$scope.docs = response.data;
		console.log("listCtrl get : ",$scope.docs);
	})

});
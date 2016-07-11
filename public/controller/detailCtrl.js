var detailCtrl = angular.module('detailCtrlModule',[]);
detailCtrl.service("getService",['$http', function($http){
		return {
			get: function(url, _params) {
				console.log("getService in detailService ");
				return $http({
					method:'GET'
					, url: url
					,params: _params
				});
			}
		}
	}]);
detailCtrl.controller('detailCtrl',function($scope, getService, $stateParams){
	console.log("deatilCtrl param : " + $stateParams.id);
	$scope.message = 'hi this is detailCtrl' + $stateParams.id;

	getService.get("/api", {'_id':$stateParams.id}).then(function(response){
		console.log("deatilCtrl get : ", $stateParams.id);
		$scope.docs = response.data;
		if ($scope.docs) {
			$scope.doc = $scope.docs[0];
		}
		console.log($scope.docs);
	})


	$scope.isEditMode = function() {
		return true;
	}
	$scope.deleteBoard = function(boardId) {
		alert(boardId);
	}


});
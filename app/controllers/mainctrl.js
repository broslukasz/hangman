myApp.controller('mainController', ['$scope', function($scope) {

	$scope.buttonArray = [];

	$scope.keyPress = function(keyCode){
   		var res = String.fromCharCode(keyCode) ;
   		$scope.buttonClicked = res;
   		$scope.buttonArray.push($scope.buttonClicked + ", ");
   		$scope.typ = typeof String.fromCharCode(keyCode);
	}

}]);
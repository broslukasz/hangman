myApp.controller('mainController', ['$scope', function($scope) {

	var wordsArray = ['piesa', 'kota', 'mysliwya'];
	var wordsLottery = function(){
		var rand = wordsArray[Math.floor(Math.random() * wordsArray.length)];
		return randomizedValue = rand.toUpperCase();	
	}();


	$scope.randomValue = randomizedValue;

	$scope.buttonArray = [];
	$scope.wordsArray = ['piesa', 'kota', 'mysliwya'];

	$scope.logArray = $scope.buttonArray;

	var primaryArray = [];
	var secondaryArray = [];

	var emptyLettersArray = function(){
		for (z = 0, x = randomizedValue.length; z<x; z++){
			primaryArray.push("_ ");
		};
		return thePrimaryArray = primaryArray;
	}();

	$scope.primaryArray = primaryArray;

	$scope.keyPress = function(keyCode){
   		var code = keyCode;
   		var res = String.fromCharCode(keyCode);
   		code > 64 && code < 91 ? ($scope.buttonClicked = res, $scope.buttonArray.push($scope.buttonClicked + ", ")) : console.log(res + " to nie litera");
		for (var g = 0, h = randomizedValue.length; g < h; g++) {
			if (res === randomizedValue.charAt(g)) {
				primaryArray[g] = res;
			} else{console.log('not' + g)}
		};
	}



	

	var fillWithLetters = function(){
		
	};
}]);
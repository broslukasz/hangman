myApp.controller('mainController', ['$scope', function($scope) {

	var wordsArray = ['piesa', 'kota', 'mysliwya'];
	var wordsLottery = function(){
		var rand = wordsArray[Math.floor(Math.random() * wordsArray.length)];
		return randomizedValue = rand.toUpperCase();	
	}();	

	$scope.randomValue = randomizedValue;

	$scope.buttonsArray = [];
	$scope.wordsArray = ['piesa', 'kota', 'mysliwya'];
	$scope.missedArray = [];

	var primaryArray = [];
	$scope.mistakesNumber = 0;

	var emptyLettersArray = function(){
		for (z = 0, x = randomizedValue.length; z<x; z++){
			primaryArray.push("_ ");
		};
		return thePrimaryArray = primaryArray;
	}();

	$scope.primaryArray = primaryArray;
	$scope.lettersMatched = [];

	$scope.keyPress = function(keyCode){
   		var code = keyCode;
   		var res = String.fromCharCode(keyCode);
   		var count = 0;
		for (var g = 0, h = randomizedValue.length; g < h; g++) {
			if (res === randomizedValue.charAt(g)) {
				primaryArray[g] = res;
				console.log('The letter is on the positin ' + g);
				if ($scope.buttonsArray.indexOf(res + ", ") >= 0) {
					console.log('The existing letter has been repeated');
					$scope.mistakesNumber++;
				} else {
					$scope.lettersMatched.push(res);
					console.log("Letter " + res + " finds in the word for the first time");
				}
				
			} else {
				console.log('not on position ' + g)
				count++;
			}
		};

		var repetition = function (){
			var countRepeat = $scope.buttonsArray.indexOf(res + ", ");
			if (count == randomizedValue.length && (code > 64 && code < 91)) {
			console.log('The letter does not exists');
			$scope.mistakesNumber++;
				if (countRepeat >= 0) {
					console.log('It is still a wrong letter');
				} else {
					$scope.missedArray.push(res + ", ");
					countRepeat++;
				}
			}
		}();
		
		code > 64 && code < 91 ? ($scope.buttonClicked = res, $scope.buttonsArray.push($scope.buttonClicked + ", ")) : console.log(res + " to nie litera");

		var ukonczono = function(){
			if ($scope.lettersMatched.length == $scope.primaryArray.length && $scope.mistakesNumber < 8) {
				console.log('You have won the game');
			} else if ($scope.mistakesNumber >= 8) {
				console.log('You have lost the game');
			}
	}();



	};



	
}]);
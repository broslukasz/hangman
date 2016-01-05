myApp.controller('mainController', ['$scope', function($scope) {

	var wordsArray = ['jastrzab', 'kredka', 'lodowka', 'pies', 'lody'];
	var wordsLottery = function(){
		var rand = wordsArray[Math.floor(Math.random() * wordsArray.length)];
		return randomizedValue = rand.toUpperCase();	
	}();

	var wordsLottery2 = function(){
		var rand = wordsArray[Math.floor(Math.random() * wordsArray.length)];
		return randomizedValue = rand.toUpperCase();	
	};	

	$scope.wordsLotteryMechanizm = wordsLottery2;
	$scope.randomValue = randomizedValue;

	$scope.buttonsArray = [];
	$scope.wordsArray = ['piesa', 'kota', 'mysliwya'];
	$scope.missedArray = [];

	var primaryArray = [];
	var secondaryArray = [];
	$scope.mistakesNumber = 0;
	$scope.hangEvent = {
		array: [],
		imgAdd: function(){
			if ($scope.mistakesNumber < 12) {
				this.array.push({url: 'assets/img/order/0' + this.array.length + '.png', imgClass: 'imgBox__hangImages--img0' + this.array.length});
			}	
		}
		};

	var emptyLettersArray = function(){
		for (z = 0, x = randomizedValue.length; z<x; z++){
			primaryArray.push("_");
		};
	}();

	$scope.makeEmpty = function(){
		primaryArray.splice(0,primaryArray.length);
		for (z = 0, x = randomizedValue.length; z<x; z++){
			primaryArray.push("_");
		};
	};

	$scope.primaryArray = primaryArray;
	$scope.lettersMatched = [];

	$scope.winsCounter = 0;

	$scope.keyPress = function(keyCode){
		console.log(keyCode);
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
					$scope.hangEvent.imgAdd();
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
			$scope.hangEvent.imgAdd();
				if (countRepeat >= 0) {
					console.log('It is still a wrong letter');
				} else {
					$scope.missedArray.push(res + " ");
					countRepeat++;
				}
			}
		}();
		
		code > 64 && code < 91 ? ($scope.buttonClicked = res, $scope.buttonsArray.push($scope.buttonClicked + ", ")) : console.log(res + " to nie litera");

		

		var ukonczono = function(){
			if ($scope.lettersMatched.length == $scope.primaryArray.length && $scope.mistakesNumber < 11) {
				setTimeout(function(){ alert("CONGRATULATIONS! You have won the game!"); }, 200);

				$scope.winsCounter++;
				$scope.buttonsArray = [];
				$scope.missedArray = [];
				$scope.hangEvent.array = [];
				$scope.lettersMatched = [];
				$scope.wordsLotteryMechanizm();
				$scope.emptyCells = [];
				$scope.emptyCells2();
				$scope.mistakesNumber = 0;
				$scope.makeEmpty();


			} else if ($scope.mistakesNumber >= 11) {
				for (var i = 0, x=randomizedValue.length; i < x; i++) {
					console.log('Słowo ma liter: ' + i);

					primaryArray[i] =  randomizedValue.charAt(i);
				};
				$scope.gameOverClasses.windowApear = 'gameOver';
				$scope.gameOverClasses.text02 = 'gameOver__text gameOver__text--02'
				
			}
		}();

		if (keyCode == 13 && $scope.mistakesNumber >= 11) {
			console.log('Kliknąłeś enter');
			$scope.pageReload();
		};
	};

	$scope.emptyCells = [];

	$scope.pageReload = function(){
		location.reload();
	};

	var emptyCells = function(){
			var countCells = (11 - randomizedValue.length);
			for(var i = 0, x = countCells; i<x; i++){
				console.log('puste są: ' + i);
				$scope.emptyCells.push('_');
			}
		}();

	var emptyCells2 = function(){
			var countCells = (11 - randomizedValue.length);
			for(var i = 0, x = countCells; i<x; i++){
				console.log('puste są: ' + i);
				$scope.emptyCells.push('_');
			}
		};

	$scope.emptyCells2 = emptyCells2;
	
	$scope.gameOverClasses = {
		windowApear: 'gameOver gameOver--hidden',
		text02: 'gameOver__text gameOver__text--02 is-gameOver__text--02--hidden'
	};

}]);
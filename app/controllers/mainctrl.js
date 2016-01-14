angular.module("myApp")
	.constant("wordsUrl", "assets/json/wordscollection.json")
	.controller('mainController', mainController);

	function mainController($scope, $http, wordsUrl){
		
		var vm = this;

		$http.get(wordsUrl)
			.success(function(data){
				vm.wordsArray = [];
				
				for (var i = 0, j = data.length; i < j; i++) {
				vm.wordsArray.push(data[i].word);
				}

				var wordsLottery = function(){
					var rand = vm.wordsArray[Math.floor(Math.random() * vm.wordsArray.length)];
					return randomizedValue = rand.toUpperCase();	
				}();

				console.log(randomizedValue);

				var wordsLottery2 = function(){
					var rand = vm.wordsArray[Math.floor(Math.random() * vm.wordsArray.length)];
					return randomizedValue = rand.toUpperCase();	
				};	

				
				vm.lettersMatched = [];
				vm.missedArray = [];
				vm.wordLettersArray = [];
				vm.emptyCells = [];
				vm.buttonsPressedArray = [];

				vm.mistakesNumber = 0;
				vm.winsCounter = 0;
				
				vm.hangEvent = {
					array: [],
					imgAdd: function(){
						if (vm.mistakesNumber < 12 && vm.lettersMatched.length < vm.wordLettersArray.length) {
							this.array.push({url: 'assets/img/order/0' + this.array.length + '.png', imgClass: 'imgBox__hangImages--img0' + this.array.length});
						}	
					}
				};
				vm.emptyCells2 = emptyCells2;
				vm.keyPress = keyPress;
				vm.makeEmpty = makeEmpty;
				vm.pageReload = pageReload;
				vm.wordsLotteryMechanizm = wordsLottery2;

				var emptyLettersArray = function(){
					for (z = 0, x = randomizedValue.length; z<x; z++){
						vm.wordLettersArray.push("_");
					};
				}();

				function makeEmpty(){
					vm.wordLettersArray.splice(0,vm.wordLettersArray.length);
					for (z = 0, x = randomizedValue.length; z<x; z++){
						vm.wordLettersArray.push("_");
					};
				};

				function keyPress(keyCode){
					console.log(keyCode);
					var code = keyCode;
			   		var currentKey = String.fromCharCode(keyCode);
			   		var count = 0;
					for (var g = 0, h = randomizedValue.length; g < h; g++) {
						if (currentKey === randomizedValue.charAt(g)) {
							vm.wordLettersArray[g] = currentKey;
							console.log('The letter is on the positin ' + g);
							if (vm.buttonsPressedArray.indexOf(currentKey + ", ") >= 0) {
								console.log('The existing letter has been repeated');
								if (vm.lettersMatched.length < vm.wordLettersArray.length) {
									vm.mistakesNumber++;
								};
								vm.hangEvent.imgAdd();
							} else {
								vm.lettersMatched.push(currentKey);
								console.log("Letter " + currentKey + " finds in the word for the first time");
							}
							
						} else {
							console.log('not on position ' + g)
							count++;
						}
					};

					var repetition = function (){
						var countRepeat = vm.buttonsPressedArray.indexOf(currentKey + ", ");
						if (count == randomizedValue.length && (code > 64 && code < 91) && vm.lettersMatched.length < vm.wordLettersArray.length) {
						console.log('The letter does not exists');
						vm.mistakesNumber++;
						vm.hangEvent.imgAdd();
							if (countRepeat >= 0) {
								console.log('It is still a wrong letter');
							} else {
								if (vm.mistakesNumber < 12) {
									vm.missedArray.push(currentKey + " ");
									countRepeat++;
								};
								
							}
						}
					}();
					
					code > 64 && code < 91 ? (vm.buttonClicked = currentKey, vm.buttonsPressedArray.push(vm.buttonClicked + ", ")) : console.log(currentKey + " to nie litera");

					var ukonczono = function(){
						if (vm.lettersMatched.length == vm.wordLettersArray.length && vm.mistakesNumber < 11) {
							vm.gameWonClasses.windowApear = 'gameWon';
							vm.gameWonClasses.text02 = 'gameOver__text gameOver__text--02';
							if (keyCode == 13) {
								gameWon();
							};

						} else if (vm.mistakesNumber >= 11) {
							for (var i = 0, x=randomizedValue.length; i < x; i++) {
								console.log('Słowo ma liter: ' + i);

								vm.wordLettersArray[i] =  randomizedValue.charAt(i);
								
							};
							vm.gameOverClasses.windowApear = 'gameOver';
							vm.gameOverClasses.text02 = 'gameOver__text gameOver__text--02';
						}
					}();

					if (keyCode == 13 && vm.mistakesNumber >= 11) {
						console.log('Kliknąłeś enter');
						vm.pageReload();
					};
				};

				function pageReload(){
					location.reload();
				};

				var emptyCells = function(){
						var countCells = (11 - randomizedValue.length);
						for(var i = 0, x = countCells; i<x; i++){
							console.log('puste są: ' + i);
							vm.emptyCells.push('_');
						}
					}();

				function emptyCells2(){
						var countCells = (11 - randomizedValue.length);
						for(var i = 0, x = countCells; i<x; i++){
							console.log('puste są: ' + i);
							vm.emptyCells.push('_');
						}
					};
				
				vm.gameOverClasses = {
					windowApear: 'gameOver is-gameOver--hidden',
					text02: 'gameOver__text gameOver__text--02 is-gameOver__text--02--hidden'
				};

				vm.gameWonClasses = {
					windowApear: 'gameWon is-gameWon--hidden',
					text02: 'gameOver__text gameOver__text--02 is-gameOver__text--02--hidden'
				};

				var gameWon = function(){
					vm.winsCounter++;
					vm.buttonsPressedArray = [];
					vm.missedArray = [];
					vm.hangEvent.array = [];
					vm.lettersMatched = [];
					vm.wordsLotteryMechanizm();
					vm.emptyCells = [];
					vm.emptyCells2();
					vm.mistakesNumber = 0;
					vm.makeEmpty();
					vm.gameWonClasses.windowApear = 'gameWon is-gameWon--hidden';
					console.log(randomizedValue);
				};

			})
	};
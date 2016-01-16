(function(){
	'use strict';

	angular.module("myApp")
		.constant("wordsUrl", "assets/json/wordsCollection.json")
		.controller('mainController', mainController);

	mainController.$inject = ['$http', 'wordsUrl']

	function mainController($http, wordsUrl){
		
		var vm = this;

		$http.get(wordsUrl)
			.success(function(data){
				vm.allWordsArray = [];
				vm.buttonsPressedArray = [];
				vm.lettersMatched = [];
				vm.missedArray = [];
				vm.displayMatchedArray = [];
				vm.inactiveCells = [];

				vm.mistakesNumber = 0;
				vm.winsCounter = 0;
				vm.randomizedWord = "";
				
				vm.hangEvent = {
					array: [],
					imgAdd: imgAdd
				};

				vm.wordsLotteryMechanizm = wordsLottery;
				vm.keyPress = keyPress;
				vm.makeInactiveCells = makeInactiveCells;
				vm.makeEmpty = makeEmpty;
				vm.pageReload = pageReload;
				vm.gameWon = gameWon;

				vm.gameWonShow = "mainCtrl.lettersMatched.length == mainCtrl.displayMatchedArray.length && mainCtrl.mistakesNumber < 11";
				vm.gameOverClasses = {
					windowApear: 'gameOver is-gameOver--hidden',
					text02: 'gameOver__text gameOver__text--02 is-gameOver__text--02--hidden'
				};
				vm.gameWonClasses = {
					windowApear: 'gameWon is-gameWon--hidden',
					text02: 'gameOver__text gameOver__text--02 is-gameOver__text--02--hidden'
				};

				wordsArrayFill();
				wordsLottery();
				emptyLettersArray();
				makeInactiveCells();

				function wordsArrayFill(){
					for (var i = 0, j = data.length; i < j; i++) {
						vm.allWordsArray.push(data[i].word);
					}
				};

				function wordsLottery(){
					var rand = vm.allWordsArray[Math.floor(Math.random() * vm.allWordsArray.length)];
					vm.randomizedWord = rand.toUpperCase();	
				};

				function emptyLettersArray(){
					for (var z = 0, x = vm.randomizedWord.length; z<x; z++){
						vm.displayMatchedArray.push("_");
					};
				};

				console.log(vm.randomizedWord);

				function makeInactiveCells(){
					var countCells = (11 - vm.randomizedWord.length);
					for(var i = 0, x = countCells; i<x; i++){
						//console.log('puste są: ' + i);
						vm.inactiveCells.push('_');
					}
				};

				function makeEmpty(){
					vm.displayMatchedArray.splice(0,vm.displayMatchedArray.length);
					for (var z = 0, x = vm.randomizedWord.length; z<x; z++){
						vm.displayMatchedArray.push("_");
					};
				};

				function keyPress(keyCode){
					// console.log(keyCode);
					var code = keyCode;
			   		var currentKey = String.fromCharCode(keyCode);
			   		var count = 0;
					for (var g = 0, h = vm.randomizedWord.length; g < h; g++) {
						if (currentKey === vm.randomizedWord.charAt(g)) {
							vm.displayMatchedArray[g] = currentKey;
							// console.log('The letter is on the positin ' + g);
							if (vm.buttonsPressedArray.indexOf(currentKey + ", ") >= 0) {
								// console.log('The existing letter has been repeated');
								if (vm.lettersMatched.length < vm.displayMatchedArray.length) {
									vm.mistakesNumber++;
								};
								vm.hangEvent.imgAdd();
							} else {
								vm.lettersMatched.push(currentKey);
								// console.log("Letter " + currentKey + " finds in the word for the first time");
							}
							
						} else {
							// console.log('not on position ' + g)
							count++;
						}
					};

					var repetitionCounter = function (){
						var countRepeat = vm.buttonsPressedArray.indexOf(currentKey + ", ");
						if (count == vm.randomizedWord.length && (code > 64 && code < 91) && vm.lettersMatched.length < vm.displayMatchedArray.length) {
						// console.log('The letter does not exists');
						vm.mistakesNumber++;
						vm.hangEvent.imgAdd();
							if (countRepeat >= 0) {
								// console.log('It is still a wrong letter');
							} else {
								if (vm.mistakesNumber < 12) {
									vm.missedArray.push(currentKey + " ");
									countRepeat++;
								};
								
							}
						}
					}();
					
					code > 64 && code < 91 ? (vm.buttonClicked = currentKey, vm.buttonsPressedArray.push(vm.buttonClicked + ", ")) : /*console.log(currentKey + " to nie litera")*/ "";

					var whenFinished = function(){
						if (vm.lettersMatched.length == vm.displayMatchedArray.length && vm.mistakesNumber < 11) {
							vm.gameWonClasses.windowApear = 'gameWon';
							vm.gameWonClasses.text02 = 'gameOver__text gameOver__text--02';
							if (keyCode == 13) {
								vm.gameWon();
							};

						} else if (vm.mistakesNumber >= 11) {
							for (var i = 0, x=vm.randomizedWord.length; i < x; i++) {
								//console.log('Słowo ma liter: ' + i);

								vm.displayMatchedArray[i] =  vm.randomizedWord.charAt(i);
								
							};
							vm.gameOverClasses.windowApear = 'gameOver';
							vm.gameOverClasses.text02 = 'gameOver__text gameOver__text--02';
						}
					}();

					if (keyCode == 13 && vm.mistakesNumber >= 11) {
						//console.log('Kliknąłeś enter');
						vm.pageReload();
					};
				};

				function imgAdd(){
						if (vm.mistakesNumber < 12 && vm.lettersMatched.length < vm.displayMatchedArray.length) {
							this.array.push({url: 'assets/img/order/0' + this.array.length + '.png', imgClass: 'imgBox__hangImages--img0' + this.array.length});
						}	
					}

				function pageReload(){
					location.reload();
				};

				function gameWon(){
					vm.winsCounter++;
					vm.buttonsPressedArray = [];
					vm.missedArray = [];
					vm.hangEvent.array = [];
					vm.lettersMatched = [];
					vm.wordsLotteryMechanizm();
					vm.inactiveCells = [];
					vm.makeInactiveCells();
					vm.mistakesNumber = 0;
					vm.makeEmpty();
					vm.gameWonClasses.windowApear = 'gameWon is-gameWon--hidden';
					console.log(vm.randomizedWord);
				};

			})
	};

})();




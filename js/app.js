//blackjack obj controls all components of the game
var blackjack = {
	//currentDeck is the [deck] for playing
	currentDeck: "",
	//create dealer
	dealer: "",
	dealerHand: "",
	dealerHandValue: "",
	//currentPlayer, [userPlayers] is an array with all players
	currentPlayer: "",
	currentPlayerHand: "",
	currentPlayerHandValue: "",
	userPlayers: [],
	userPlayersHand: [],
	//setup some init value, user will input real val from prompt once game starts
	shoe: 0,
	playerCount: 0,
	playerStartMoney: 0,
	//current player index, moves up as player pass prority, 2 prority to pass
	prorityHolder: 0,
	//spilt prority check if current play has pass proripty playing a spilt hand
	proritySpiltHolder: 0,
	//more attr
	hidden : "",
	// users hits start button: prompts user inputs, create player, dealer, deck
	makeGame: function (startGameButton) {
		// phase 0: setup this.makeGame, create player, dealer, deck, can hit start playing
		this.shoe = prompt("How many decks would you like to play with?\n \nIncreasing the number of decks may give the house an advantage.", "1");
		this.playerCount = prompt("How players do we have today?\n \nSupports (1-5) players.", "1");
		this.playerStartMoney = prompt("How much money does each player start with?", "110");
		this.currentDeck = new Deck();
		// create a deck from user's input num, shuffle it
		this.currentDeck.createDeck(this.shoe);
		this.currentDeck.shuffle(this.currentDeck.library);
		// create player/players to join the game from user's input num
		for (var p = 0; p < parseInt(this.playerCount); p++) {
			this.currentPlayer = new Player(this.playerStartMoney); 
			this.userPlayers.push(this.currentPlayer);
		};
		console.log(this.userPlayers);
		// create player betting stations
		if (this.playerCount == 1) {
			var firstStation = $('<img class="betting-area-C">'); 
			firstStation.attr('src', "img/betting_station_folder/player1betArea.png");
			firstStation.appendTo('#stationC');
			var upBet = $('<div class="upBet">'); 
			upBet.appendTo('#stationC');
			//create bank/betting display text
			var firstBank = $('<div class="bankText">');
			firstBank.attr("id", "stationCBank");
			firstBank.appendTo('#stationC');
			var firstBet = $('<div class="betText">');
			firstBet.attr("id", "stationCBet");
			firstBet.appendTo('#stationC');
			//javascript lose scope so well...betting increase/decrease
			$("#stationCBet").html(" $ " + blackjack.userPlayers[0].onTableBet);
			$("#stationCBank").html(" Bankroll \n$ " + blackjack.userPlayers[0].bankroll);
			upBet.click(function(){
				blackjack.userPlayers[0].upbet();
				$("#stationCBet").html(" $ " + blackjack.userPlayers[0].onTableBet);
				$("#stationCBank").html(" Bankroll \n$ " + blackjack.userPlayers[0].bankroll);
			});
			var downBet = $('<div class="downBet">'); 
			downBet.appendTo('#stationC');
			downBet.click(function(){
				blackjack.userPlayers[0].downbet();
				$("#stationCBet").html(" $ " + blackjack.userPlayers[0].onTableBet);
				$("#stationCBank").html(" Bankroll \n$ " + blackjack.userPlayers[0].bankroll);
			});
			//create player char pic bnw
			var firstBnwPic = $('<img class="black-white-pic">'); 
			firstBnwPic.attr('src', playerChar.playerBlackWhitePic[0]);
			firstBnwPic.appendTo('#stationC');
		};
		// create a dealer to join the game
		this.dealer = new Dealer();
		console.log(this.dealer);
	},
	// starts new game once run
	startGame: function () {
		// clear the board no cards on table
		this.prorityHolder = 0;
		proritySpiltHolder = 0;
		// clean up player display
		$("#dealerBox").empty();
		if (this.playerCount == 1) {
			$('#slotC').empty();
			$('#slotC').removeClass();
			$('#result').remove();
		};
		//check if the deck has at least 20 cards left
		if (this.currentDeck.count() >= 20) {
			console.log("Game has started!")
			//clear dealer's hand
			this.dealerHand = "";
			this.dealerHandValue = "";
			this.dealer.hand = [];
			//Give 2 cards to dealer 1 faceup 1 facedown
			this.dealerHand = this.dealer.draw(this.currentDeck.library);
			//check and show dealer's hand
			this.dealer.checkHand();
			//Give 2 card to each player
			for (var p = 0; p < this.userPlayers.length; p++) {
				this.currentPlayer = this.userPlayers[p];
				//clear player's hand
				this.currentPlayerHand = "";
				this.currentPlayerHandValue = "";
				this.currentPlayer.hand = [];
				this.currentPlayer.alreadySpilt = false;
				//deal cards to player
				this.currentPlayerHand = this.currentPlayer.draw(this.currentDeck.library);
				// check show player's hand
				this.currentPlayer.checkHand();
				// checks for a spilt
				if (this.currentPlayer.doublesCheck(this.currentPlayerHand) == "DOUBLE") {
					// theres the double the spilt button should show now 
					console.log("You got a double! You are able to spilt if you want.")
				}else if (this.currentPlayer.doublesCheck(this.currentPlayerHand) == "SINGLE") {
					console.log("No doubles here, keep going.")
				};
			};
			// Deal out cards for dealer
			var hiddenCard = $('<img id="hiddenCard">');
			hiddenCard.attr('src', "img/card_images_folder/rback.png");
			hiddenCard.appendTo('#dealerBox');
			var shownFirstCard = $('<img id="showCard-1">');
			shownFirstCard.attr('src', this.dealer.hand[1].image);
			shownFirstCard.appendTo('#dealerBox');
			// phase 2: init game, deals starting hand for each player/dealer, check for insurance, hit dealer
			console.log("There are " + this.currentDeck.count() + " left in the deck.");
			// check priority run once wait for player to decide what to do next when they click button
			console.log("If dealer has an A, there are desire to insurances, do this step.")
			// Deal out cards and display them depending on num of player
			if (this.playerCount == 1) {
				// set class depending on which card it currently is
				var firstCard = $('<img class="first-card-norm">'); 
				firstCard.attr('src', this.currentPlayer.hand[0].image);
				firstCard.appendTo('#slotC');
				var secondCard = $('<img class="second-card-norm">'); 
				secondCard.attr('src', this.currentPlayer.hand[1].image);
				secondCard.appendTo('#slotC');
			};
			this.priorityCheck();
		}else{
			alert("Not enough cards in the deck to play a game.")
		};
	},
	//priorityCheck keeps the flow of the game and keep track of each players turn
	priorityCheck: function () {
		// fade player who pass prority
		if (this.prorityHolder > 0) {
			$( "#slotC" ).addClass( "fade" );
		};
		// check default priority, while current player has priority give that player button controls
		if (this.prorityHolder < this.playerCount) {
			// priority is to give control of buttons to target player, show button via CSS design
			console.log("This is currently player (" + (this.prorityHolder + 1) + ")'s turn.")
			// check cards in player hands use CSS style to show player their options

			console.log("Display the the style GUI for player " + (this.prorityHolder + 1));
		}else if (this.prorityHolder == this.playerCount) {
			console.log("All players are done with their actions, dealer's show now.");
			this.dealerAction();
		};
	},
	// playerActionButton is target of the clicked button, current player is the prorityHolder, button finds the player, game is starting with player 1
	playerActions: function (playerActionButton) {
		var currentDisplayBlock = '#slotC';
		// phase 3: each player plays, check game conditions for (hit/spilt/doubleDown/surrender)
		if (playerActionButton == "stand") {
			//stand: pass priority, nothing else happens on this turn
			console.log("player choose to stand!")
			this.prorityHolder++;
			this.priorityCheck();
		}else if (playerActionButton == "hit") {
			//hit: run hit if it's called, hold prority, else bust & lose
			console.log("player choose to hit!")
			//currentPlayerHand is indexed by prorityHolder action is done to that player obj
			this.currentPlayerHand = this.userPlayers[this.prorityHolder].hit(this.currentDeck.library);
			//if player hit and doesn't bust, they can chose to keep hitting
			console.log(this.userPlayers[this.prorityHolder].hand);
			//add a card for each hit or bust
			var currentHandSize = this.userPlayers[this.prorityHolder].hand.length;
			if (currentHandSize == 3) {
				var addCard = $('<img class="third-card-norm">'); 
				addCard.attr('src', this.currentPlayer.hand[2].image);
				addCard.appendTo(currentDisplayBlock);
				console.log("added card.")
			}else if (currentHandSize == 4) {
				var addCard = $('<img class="fourth-card-norm">'); 
				addCard.attr('src', this.currentPlayer.hand[3].image);
				addCard.appendTo(currentDisplayBlock);
				console.log("added card.")
			}else if (currentHandSize == 5) {
				var addCard = $('<img class="fifth-card-norm">'); 
				addCard.attr('src', this.currentPlayer.hand[4].image);
				addCard.appendTo(currentDisplayBlock);
				console.log("added card.")
			}else if (currentHandSize == 6) {
				var addCard = $('<img class="sixth-card-norm">'); 
				addCard.attr('src', this.currentPlayer.hand[5].image);
				addCard.appendTo(currentDisplayBlock);
				console.log("added card.")
			};
			if (this.currentPlayerHand == "BUST") {
				console.log(this.userPlayers[this.prorityHolder].hand);
				//priority is passed if the player busts
				this.prorityHolder++;
				this.priorityCheck();
			};
		}else if (playerActionButton == "double") {
			//double down: add money & add 1 card pass priority
			console.log("player choose to double, add that bet amount")
			//change the bet amount
			this.currentPlayerHand = this.userPlayers[this.prorityHolder].hit(this.currentDeck.library);
			console.log(this.userPlayers[this.prorityHolder].hand);
			this.userPlayers[this.prorityHolder].checkHand();
			//add a card display
			var currentHandSize = this.userPlayers[this.prorityHolder].hand.length;
			if (currentHandSize == 3) {
				var addCard = $('<img class="third-card-norm">'); 
				addCard.attr('src', this.currentPlayer.hand[2].image);
				addCard.appendTo(currentDisplayBlock);
				console.log("added card.")
			}
			this.userPlayers[this.prorityHolder].doubledowned = true;
			this.prorityHolder++;
			this.priorityCheck();
		}else if (playerActionButton == "spilt") {
			//spilt: put card into spiltHand, with double the bet and gets another hand, player can only spilt once per game
			if (this.currentPlayer.doublesCheck(this.currentPlayerHand) == "DOUBLE" && this.currentPlayer.alreadySpilt == false) {
				this.userPlayers[this.prorityHolder].spilt();
				// show spilt icon div for player to play the spilt hand
			};
			//proritySpiltHolder
			//spiltAces: put each Ace in each hand, but only get one more card on each hand
		};
	},
	dealerAction: function () {
		// phase 4: dealer game, dealer keeps drawing until, table rule of s17 or bust
		console.log("This where dealer plays the game.");
		this.dealer.softSeventeen(this.currentDeck.library);
		this.dealer.checkHand();
		this.dealerHandValue = this.dealer.handValue;
		// phase 5: each player compare against the dealer natural/win/lose/push
		console.log("This is where everything is checked, dealer compare against each player.");
		for (var p = 0; p < this.userPlayers.length; p++) {
			this.userPlayers[p].checkHand();
			this.currentPlayerHandValue = this.userPlayers[p].handValue;
			console.log("Player (" + (p+1) + ") hand " + this.currentPlayerHandValue + " vs dealer " + this.dealerHandValue)
			// phase 6: each spilt hand compare against the dealer natural/win/lose/push
			if (this.currentPlayerHandValue == this.dealerHandValue || (this.currentPlayerHandValue > 21 && this.dealerHandValue > 21)) {
				this.userPlayers[p].gameResult = "PUSH";
			};
			// check for win no one is bust
			if (this.currentPlayerHandValue <= 21 && this.dealerHandValue <= 21) {
				if (this.currentPlayerHandValue > this.dealerHandValue) {
					this.userPlayers[p].gameResult = "WIN";
				}else if (this.currentPlayerHandValue < this.dealerHandValue) {
					this.userPlayers[p].gameResult = "LOSE";
				};
			// check for non-bust wins
			}else if (this.currentPlayerHandValue > 21 || this.dealerHandValue > 21) {
				if (this.currentPlayerHandValue <= 21 && this.dealerHandValue > 21) {
					this.userPlayers[p].gameResult = "WIN";
				}else if (this.dealerHandValue <= 21 && this.currentPlayerHandValue > 21) {
					this.userPlayers[p].gameResult = "LOSE";
				};
			};
			// phase 7: payout to each player, non-spilt
			if (this.userPlayers[p].gameResult == "WIN") {
				console.log("Player (" + (p+1) + ") wins!");
				this.userPlayers[p].bankroll = parseInt(this.userPlayers[p].bankroll) + parseInt(this.userPlayers[p].onTableBet);
				this.userPlayers[p].onTableBet = this.userPlayers[p].onTableBet;
				// display win/lose/push to each player
				var result = $('<img class="result-display">');
				result.attr('src', "img/game_result_folder/win.png");
				result.attr('id', "result");
				result.appendTo('#stationC');
			}else if (this.userPlayers[p].gameResult == "PUSH") {
				this.userPlayers[p].bankroll = this.userPlayers[p].bankroll;
				this.userPlayers[p].onTableBet = this.userPlayers[p].onTableBet;
				console.log("Push. It's a tie.")
				var result = $('<img class="result-display">');
				result.attr('src', "img/game_result_folder/push.png");
				result.attr('id', "result");
				result.appendTo('#stationC');
			}else if (this.userPlayers[p].gameResult == "LOSE") {
				this.userPlayers[p].bankroll = this.userPlayers[p].bankroll - this.userPlayers[p].onTableBet;
				this.userPlayers[p].onTableBet = 0;
				console.log("Player (" + (p+1) + ") lose!");
				var result = $('<img class="result-display">');
				result.attr('src', "img/game_result_folder/lose.png");
				result.attr('id', "result");
				result.appendTo('#stationC');			
			};
			//update HTML money display
			$("#stationCBet").html(" $ " + blackjack.userPlayers[p].onTableBet);
			$("#stationCBank").html(" Bankroll \n$ " + blackjack.userPlayers[p].bankroll);
			//show dealer's card
			this.hidden = $('#hiddenCard');
			this.hidden.attr('src', blackjack.dealer.hand[0].image);
			for (var d = 1; d < this.dealer.hand.length; d++) {
				if (d == 2) {
					var shownSecondCard = $('<img id="showCard-2">');
					shownSecondCard.attr('src', this.dealer.hand[d].image);
					shownSecondCard.appendTo('#dealerBox');
				}else if (d == 3) {
					var shownThirdCard = $('<img id="showCard-3">');
					shownThirdCard.attr('src', this.dealer.hand[d].image);
					shownThirdCard.appendTo('#dealerBox');
				}else if (d == 4) {
					var shownFourthCard = $('<img id="showCard-4">');
					shownFourthCard.attr('src', this.dealer.hand[d].image);
					shownFourthCard.appendTo('#dealerBox');
				}else if (d == 5) {
					var shownFifthCard = $('<img id="showCard-5">');
					shownFifthCard.attr('src', this.dealer.hand[d].image);
					shownFifthCard.appendTo('#dealerBox');
				};
			};
		};
		// phase 8: payout to each spilt player 
		console.log("This is where all spilt hand is checked, dealer compare against each spilt hand.");
	}
};
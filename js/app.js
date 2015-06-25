//blackjack obj controls all components of the game
var blackjack = {
	//currentDeck is the [deck] for playing
	currentDeck: "",
	//create dealer
	dealer: "",
	dealerHand: "",
	//currentPlayer, [userPlayers] is an array with all players
	currentPlayer: "",
	currentPlayerHand: "",
	userPlayers: [],
	userPlayersHand: [],
	//setup some init value, user will input real val from prompt once game starts
	shoe: 0,
	playerCount: 0,
	playerStartMoney: 0,
	//current player index, moves up as player pass prority, 2 prority to pass
	prorityHolder: 0,
	// users hits start button: prompts user inputs, create player, dealer, deck
	makeGame: function (startGameButton) {
		// phase 0: setup this.makeGame, create player, dealer, deck, can hit start playing
		this.shoe = prompt("How many decks would you like to play with?\n \nIncreasing the number of decks may give the house an advantage.", "1");
		this.playerCount = prompt("How players do we have today?\n \nSupports (1-5) players.", "1");
		this.playerStartMoney = prompt("How much money does each player have to start?", "100");
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
		// create a dealer to join the game
		this.dealer = new Dealer();
		console.log(this.dealer);
	},
	readyCheck: function (readyButton) {
		// phase 1: upkeep. each player bets, hits ready button, waits for game to start
		console.log("all players have entered desired bets and ready to play.\n \nLet's get it on!");
	},
	startGame: function () {
		//check if the deck has at least 10 cards left
		if (this.currentDeck.count() >= 10) {
			console.log("Game has started!")
			//Give 2 cards to dealer 1 faceup 1 facedown
			this.dealerHand = this.dealer.draw(this.currentDeck.library);
			console.log(this.dealerHand);
			//Give 2 card to each player
			for (var p = 0; p < this.userPlayers.length; p++) {
				this.currentPlayer = this.userPlayers[p];
				this.currentPlayerHand = this.currentPlayer.draw(this.currentDeck.library);
				//console.log(this.currentPlayerHand);
			};
			console.log(this.currentDeck.count());
			// phase 2: init game, deals starting hand for each player/dealer, check for insurance, hit dealer
			console.log("If there are insurances, do this step.")
			// check priority run once wait for player to decide what to do next when they click button
			this.priorityCheck();
		}else{
			alert("Not enough cards in the deck to play a game.")
		};
	},
	//priorityCheck keeps the flow of the game and keep track of each players turn
	priorityCheck: function () {
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
			this.prorityHolder++;
			this.priorityCheck();
		}else if (playerActionButton == "surrender") {
			//surrender: get half money back, pass priority & lose
			console.log("Half of the bet is taken away from target player.")
			this.prorityHolder++;
			this.priorityCheck();
		};
		//spilt: put card into spiltHand, with double the bet and gets another hand
		//spiltAces: put each Ace in each hand, but only get one more card on each hand
	},
	dealerAction: function () {
		// phase 4: dealer game, dealer keeps drawing until, table rule of s17 or bust
		console.log("This where dealer plays the game.");
		this.dealer.softSeventeen(this.currentDeck.library);
		// phase 5: each player compare against the dealer natural/win/lose/push
		console.log("This is where everything is checked, dealer compare against each player.");
		for (var p = 0; p < this.userPlayers.length; p++) {
			this.userPlayers[p].checkHand();
			console.log("Player's hand value is " + this.userPlayers[p].handValue);

		};
		// payout to each player (natural/win/lose/push)
	}
};
/* wishlist: up up down down left right left right ba start (cheat happenes) */
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
	//current player index, moves up as player pass prority
	prorityHolder: 0,
	// users hits start button: prompts user inputs, create player, dealer, deck
	makeGame: function (startGameButton) {
		// phase 0: setup this.makeGame, create player, dealer, deck, can hit start playing
		this.shoe = prompt("How many decks would you like to play with?\n \nIncreasing the number of decks may give the house an advantage.", "4");
		this.playerCount = prompt("How players do we have today?\n \nSupports (1-4) players.", "1");
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
		// phase 1: upkeep. each player bets, hits ready, waits for game to start
		// eventListener for ready button and once everyone is ready start the game

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
		
			// check priority run once wait for player to decide what to do next when they click button
			this.priorityCheck();
		}else{
			alert("Not enough cards in the deck to play a game.")
		};
	},
	priorityCheck: function () {
		// check default priority, while current player has priority give that player button controls
		if (this.prorityHolder < this.playerCount) {
			// priority is to give control of buttons to target player, show button via CSS design, button function connection
			//change how event listener work 
			console.log("This is currently player (" + (this.prorityHolder + 1) + ")'s turn.")
			// check cards in player hands use CSS style to show player their options
			console.log("Display the the style and click-ables " + (this.prorityHolder + 1) + " connect the buttons so they do something.")
		};
	},
	playerActions: function (playerActionButton) {
		// phase 3: each player plays, check game conditions for (hit/spilt/doubleDown/surrender), starting from right until each player plays until 21 or bust or stand and pass their turn, prority checks the player.hand & player.spiltHand

		//stand: pass priority
		if (playerActionButton == "stand") {
			console.log("player choose to stand!")
			this.prorityHolder++;
			this.priorityCheck();
		}else if (playerActionButton == "hit") {
		//hit: run hit if it's called, hold prority, else bust & lose
			console.log("player choose to hit!")
			this.currentPlayerHand = this.userPlayers[this.prorityHolder].hit(this.currentDeck.library);
			if (this.currentPlayerHand == "BUST") {
				console.log(this.userPlayers[this.prorityHolder].hand);
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
		};
		
		//surrender: get half money back, pass priority & lose

		//spilt: put card into spiltHand, with 
		//spiltAces: 

	},
	dealerAction: function () {
		// phase 4: dealer game, dealer keeps drawing until, table rule of s17 or bust
		console.log("This is where dealer plays.");

		// phase 5: highest hand players closest to 21 compare their hand against dealer if dealer didn't bust, pay out to each player, clear dealer hand, clear player hand 
		console.log("This is where everything is checked, winner is found")
	}
};

//testing dangs
blackjack.makeGame();
blackjack.readyCheck();
blackjack.startGame();
//player actions as follows
//blackjack.playerActions("stand");
//blackjack.playerActions("hit");
blackjack.playerActions("double");



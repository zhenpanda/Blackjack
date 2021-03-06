//|Card| Constructor: takes argument, stores attrs, show/hide visible 
var Card = function (assignNum, assignSuit, assignValue, assignURL) {
	this.num = assignNum;
	this.suit = assignSuit;
	this.cardValue = assignValue;
	this.visible = true;
	this.image = assignURL;
	this.hide = function () {this.hidden = false};
	this.show = function () {this.hidden = true};
};
//|Deck| Constructor: create (card) objs, holds an array[deck], shuffle [deck] argument
var Deck = function () {
	this.suits = ["Hearts","Diamonds","Clubs","Spades"]
	this.nums = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
	this.library = [];
	//creates a single deck add it to library
	this.createDeck = function (numOfDecks) {
		this.numOfDeckToCreate = numOfDecks;
		if (this.numOfDeckToCreate != 0) {
			for (var d = 0; d < parseInt(this.numOfDeckToCreate); d++) {
				var currentCardCount = 1;
				//create num of deck equal to numOfDecks to make library of mulitple decks
				for (var s=0; s<this.suits.length; s++) {
					for (var n=0; n<this.nums.length; n++) {
						if (this.nums[n] == "A") {
							//Ace is 11 until it's changed to 1
							var cardIntValue = 11; 
						}else if (this.nums[n] == "J" || this.nums[n] == "Q" || this.nums[n] == "K") {
							var cardIntValue = 10;
						}else{
							var cardIntValue = parseInt(this.nums[n]);
						}
						//create card objs put them in library
						var currentCardURL = "img/card_images_folder/" + currentCardCount + "cardimg.png";
						this.library.push(new Card( this.nums[n], this.suits[s], cardIntValue, currentCardURL));
						currentCardCount++;
					};
				};		
			};
		}else if (this.numOfDeckToCreate == 0) {
			//create test deck
			for (var t = 0; t < 52; t++) {
				this.library.push(new Card( "K", "Hearts", 10));
				this.library.push(new Card( "K", "Diamonds", 10));
			};
		};
	};
	this.shuffle = function (deck){
		this.o = deck;
	    for(var j, x, i = this.o.length; i; j = Math.floor(Math.random() * i), x = this.o[--i], this.o[i] = this.o[j], this.o[j] = x);
	    return this.o;
	};
	this.count = function () {
		return (this.library.length);
		console.log(this.library.length);
	};
};
//|Player| Constructor: create (player) obj, holds a [hand], hit, stand, spilt, doubleDown, surredner, insurance, takes argument from user
var Player = function (startingMoney) {
	this.isReady = false;
	// money func
	this.onTableBet = 10;
	this.bankroll = startingMoney - 10;
	// game func
	this.hand = [];
	this.startingHand = []
	this.handValue = 0;
	this.spiltHand = [];
	this.spiltHandValue = 0;
	this.playerDrawDeck = "";
	this.aceIndex = 0;
	// player actions
	this.doubledowned = false;
	this.alreadySpilt = false;
	this.gameResult = "";
	this.spiltResult = "";
	this.upbet = function () {
		// puts money from bankroll on onTableBet, use button to increase bet
		if (this.bankroll >= 5) {
			this.bankroll = this.bankroll - 5;
			this.onTableBet = this.onTableBet + 5;
			console.log("Incrase Bet!");
			console.log("Bank min " + this.bankroll);
		};
	};
	this.downbet = function () {
		// take money from bankroll on onTableBet, use button to decrease bet
		if (this.onTableBet >= 5) {
			this.bankroll = this.bankroll + 5;
			this.onTableBet = this.onTableBet - 5;
			console.log("decrease Bet!");
			console.log("Bank min " + this.bankroll);
		};
	};
	this.payout = function () {
		// win/lose/push changes the player's bankroll
	};
	this.insurance = function () {
		// check if has extra money, add to insurance, side bet
	};
	//must account for Ace change-able value! check Ace and set Ace for desired value.
	this.draw = function (drawDeck) {
		// draw 2 cards from the deck add to player hand
		this.playerDrawDeck = drawDeck;
		this.hand.push(this.playerDrawDeck.pop(), this.playerDrawDeck.pop());
		return (this.hand);
		// check for spilt-able hand
	};
	this.checkHand = function () {
		// checks current hand's value returns int to hand handValue
		this.handValue = 0;
		for (var c = 0; c < this.hand.length; c++) {
			this.handValue = this.handValue + this.hand[c].cardValue;
			// count how many Ace in the hand
			if (this.hand[c].num == "A") {
				this.aceIndex = c;
			};
		};
		// if there is a "bust"ed hand and there's an Ace, address the Ace value
		if ((this.handValue > 21) && (this.aceIndex > 0)) {
			// change the Ace to a 1 both in num and value
			this.hand[this.aceIndex].num = "1";
			this.hand[this.aceIndex].cardValue = 1;
			//decrease the value of Ace to 1
			this.handValue = this.handValue - 10;
			this.aceIndex = 0;
			console.log("Ace was changed.")
		};
		console.log("Player's hand value is "+ this.handValue);
		console.log(this.hand);
	};
	this.hit = function (drawDeck) {
		// draw cards from the [deck] obj, check for bust lose
		this.playerDrawDeck = drawDeck;
		this.hand.push(this.playerDrawDeck.pop())
		this.checkHand();
		if (this.handValue <= 21) {
			console.log(this.handValue + " still in it.")
			return ("SAFE");
		}else if (this.handValue > 21) {};{
			console.log("over 21 bust!")
			return ("BUST");
		};
	};
	this.doublesCheck = function (handCheck) {
		// checks if player's hand have doubles of of same card
		this.startingHand = handCheck;
		if (this.startingHand[0].num == this.startingHand[1].num) {
			return ("DOUBLE")
		}else{
			return ("SINGLE")
		};
	};
	this.spilt = function () {
		// spilt hands into spilt hand
		console.log("Hand has spilt into spiltHand.");
		this.spiltHand[0] = this.hand.shift();
		console.log(this.hand);
		console.log(this.spiltHand);
		this.alreadySpilt = true;
	};
};
//|Dealer| Constructor: create (dealer) obj, holds a [hand], hit, stand, table takes care of money
var Dealer = function () {
	this.currentDraw = "";
	this.faceupDraw = "";
	this.facedownDraw = "";
	this.hand = [];
	this.handValue = 0;
	this.aceIndex = 0;
	this.draw = function (drawDeck) {
		// draw a card from deck, one faceup, one facedown, added to hand
		this.dealerDrawDeck = drawDeck;
		this.faceupDraw = this.dealerDrawDeck.pop();
		this.facedownDraw = this.dealerDrawDeck.pop();
		this.hand.push(this.faceupDraw , this.facedownDraw);
		return this.hand;
	};
	this.checkHand = function () {
		// checks current hand's value returns int to hand handValue
		this.handValue = 0;
		for (var c = 0; c < this.hand.length; c++) {
			this.handValue = this.handValue + this.hand[c].cardValue;
			// count how many Ace in the hand
			if (this.hand[c].num == "A") {
				this.aceIndex = c;
			};
		};
		// if there is a "bust"ed hand and there's an Ace, address the Ace value
		if ((this.handValue > 21) && (this.aceIndex > 0)) {
			// change the Ace to a 1 both in num and value
			//debugger;
			this.hand[this.aceIndex].num = "1";
			this.hand[this.aceIndex].cardValue = 1;
			//decrease the value of Ace to 1
			this.handValue = this.handValue - 10;
			console.log("Ace was changed.")
		};
		console.log("Dealer's hand value is "+ this.handValue);
		console.log(this.hand);
	};
	this.softSeventeen = function (drawDeck) {
		this.dealerDrawDeck = drawDeck;
		// dealer has a fix rule if hand is less than 17, dealer must hit until they get 17 or greater
		console.log("Play until dealer got greater than 17.")
		// check if you got more than 17
		this.checkHand();
		while (this.handValue < 17) {
			console.log("Dealer's drawing a card.")
			this.currentDraw = this.dealerDrawDeck.pop();
			//draw a card
			this.hand.push(this.currentDraw);
			//set hand value
			this.checkHand();
		};
		if (this.handValue > 21) {
			console.log("Dealer has hit a bust.")
			return ("BUST");
		};
	};
};
var playerChar = {
	playerBlackWhitePic: [
	"img/player_char_folder/bw1player.png",
	"img/player_char_folder/bw2player.png",
	"img/player_char_folder/bw3player.png",
	"img/player_char_folder/bw4player.png",
	"img/player_char_folder/bw5player.png"
	],
	playerCharPic: [
	"img/player_char_folder/1player.png",
	"img/player_char_folder/2player.png",
	"img/player_char_folder/3player.png",
	"img/player_char_folder/4player.png",
	"img/player_char_folder/5player.png"
	],
	playerStation: [
	"stationA",
	"stationB",
	"stationC",
	"stationD",
	"stationE"
	],
	playerStationBoard: [
	"img/betting_station_folder/betting_station_5.png",
	"img/betting_station_folder/betting_station_4.png",
	"img/betting_station_folder/betting_station_3.png",
	"img/betting_station_folder/betting_station_2.png",
	"img/betting_station_folder/betting_station_1.png"
	],
	playerStationBank: [
	"stationABank",
	"stationBBank",
	"stationCBank",
	"stationDBank",
	"stationEBank"
	],
	playerStationBet: [
	"stationABet",
	"stationBBet",
	"stationCBet",
	"stationDBet",
	"stationEBet"
	],
	playerSlot: [
	"slotA",
	"slotB",
	"slotC",
	"slotD",
	"slotE"
	]
};

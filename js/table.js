//window.onload generate buttons 
$(function() {
    alert( "Weclome to the Sierra Madre Casino.\nLet go...and begin...Again...\njavaScript loaded!" );
	//starts the game create: deck/players/dealer
/*	blackjack.makeGame();*/
	//checks for all bets are set to kick off game
/*	blackjack.readyCheck();*/
	//game starts, begin playing
/*	blackjack.startGame();*/
	
	//player actions as follows
/*	
	blackjack.playerActions("stand");
	blackjack.playerActions("hit");
	blackjack.playerActions("double");
	blackjack.playerActions("surrender");
	blackjack.playerActions("spilt");
	blackjack.playerActions("test");
*/
	//create button element for existing items 
	$("#newGame").click(function(){
		blackjack.makeGame();
		blackjack.readyCheck();
	});
	$("#playGame").click(function(){
		blackjack.startGame();
	});
});

//depending on number of players creates the player slot accordingly

// hitButton.addEventListener("click", function() {
// 	blackjack.playerActions("hit");
// })






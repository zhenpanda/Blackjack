//window.onload generate buttons 
$(function() {
	console.log("js loaded.")
    alert( "Weclome to the Sierra Madre Casino.\nClick [NEW] Button to setup new game.\nClick [Play] to start game.\n\nGood game! Have Fun!" );
	//starts the game create: deck/players/dealer
/*	blackjack.makeGame();*/
	//checks for all bets are set to kick off game
/*	blackjack.readyCheck();*/
	//game starts, begin playing
/*	blackjack.startGame();*/
	
/*	
	blackjack.playerActions("hit");
	blackjack.playerActions("stand");
	blackjack.playerActions("double");
	blackjack.playerActions("spilt");
*/
	//create button element for creating game
	$("#newGame").click(function(){
		blackjack.makeGame();
	});
	$("#playGame").click(function(){
		blackjack.startGame();
	});
	//create button element for player actions
	$("#hit").click(function(){
		blackjack.playerActions("hit");
	});
	$("#stand").click(function(){
		blackjack.playerActions("stand");
	});
	$("#double").click(function(){
		blackjack.playerActions("double");
	});
});






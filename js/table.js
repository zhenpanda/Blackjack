//window.onload generate buttons 
$(function() {
    alert( "javascript loaded, start testing!" );
	//starts the game create: deck/players/dealer
	blackjack.makeGame();
	//checks for all bets are set to kick off game
	blackjack.readyCheck();
	//game starts, begin playing
	blackjack.startGame();
	
	//player actions as follows
	//blackjack.playerActions("stand");
	//blackjack.playerActions("hit");
	//blackjack.playerActions("double");
	//blackjack.playerActions("surrender");
	//blackjack.playerActions("spilt");
	//blackjack.playerActions("test");
 
	//depending on number of players creates the player slot accordingly
	if (blackjack.userPlayers.length > 0) {	
		$("#slotA").click(function(){ blackjack.startGame(); });
	};
});



// hitButton.addEventListener("click", function() {
// 	blackjack.playerActions("hit");
// })





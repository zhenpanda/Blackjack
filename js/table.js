//One player GUI station
//CSS & HTML style shows which player's turn it currently is
//Cards for each player is displayed on table at all times

$(function() {
    alert( "javascript loaded, start testing!" );

	//testing dangs
	blackjack.makeGame();
	blackjack.readyCheck();
	blackjack.startGame();

	//player actions as follows
	blackjack.playerActions("stand");
	//blackjack.playerActions("hit");
	//blackjack.playerActions("double");
	//blackjack.playerActions("surrender");
});







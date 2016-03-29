
var game = new Game();

loader.addCompletionListener(function() {
	if (game.init())
		game.start();
});
loader.start();


var WIDTH = 640;
var HEIGHT = 480;

var canvas, ctx;

var Player = {
	speed: 512,
	x: 0,
	y: 0
}

function Game() {

	this.init = function() {
		$("#loading").remove();
		
		canvas = document.getElementById("canvas");
		if (!canvas.getContext) return false;
		ctx = canvas.getContext("2d");		
	
		$("#content").append(canvas);

		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		
		return true;
	}
	
	this.start = function() {
		Player.x = WIDTH / 2;
		Player.y = HEIGHT / 2;			
	
		animate();
	}
	
	var last;
	function animate(timestamp) {
		requestAnimFrame(animate);
		if (last > 0 && timestamp > 0) {
			render((timestamp - last)/1000);
		}
		last = timestamp;
	}
	
	function render(delta) {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(0,0,WIDTH, HEIGHT);
		
		if (keysDown[38]) Player.y -= Player.speed * delta;
		if (keysDown[40]) Player.y += Player.speed * delta;
		if (keysDown[37]) Player.x -= Player.speed * delta;
		if (keysDown[39]) Player.x += Player.speed * delta;
		
		Player.x = Math.min(Math.max(16, Player.x), WIDTH-16);
		Player.y = Math.min(Math.max(16, Player.y), HEIGHT-16);
	
		ctx.drawImage(testImg,Player.x-16,Player.y-16);
	}
	
	
	/**
	 * requestAnim shim layer by Paul Irish
	 * Finds the first API that works to optimize the animation loop,
	 * otherwise defaults to setTimeout().
	 */
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame   ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame    ||
				window.oRequestAnimationFrame      ||
				window.msRequestAnimationFrame     ||
				function(/* function */ callback, /* DOMElement */ element){
					window.setTimeout(callback, 1000 / 60);
				};
	})();

}
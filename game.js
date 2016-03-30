

function Game() {

	var player;
	var stars = [];
	var star_speed = 128;

	var entities = [];
	
	this.init = function() {
		$("#loading").remove();
		
		canvas = document.getElementById("canvas");
		if (!canvas.getContext) return false;
		ctx = canvas.getContext("2d");		
	
		$("#content").append(canvas);

		canvas.width = width;
		canvas.height = height;
		
		return true;
	}
	
	this.start = function() {
	
		entities.push(new Player(width / 2, height - 64));
		
		for(var i = 0; i < 100; i++) {
			stars[3*i+0] = Math.random()*width;
			stars[3*i+1] = Math.random()*height;
			stars[3*i+2] = Math.random();
		}
	
		animate();
	}
	
	var last = -1;
	function animate(timestamp) {
		requestAnimFrame(animate);
		if (last > 0 && timestamp > 0) {
			var delta = (timestamp - last)/1000;
			if (delta > 0.5) delta = 0.5;
			render(delta);
		}
		last = timestamp;
	}
	
	var enemy_timer = 0;
	var enemy_delay = 1;
	function render(delta) {
		
		// Update
			// Entities
			for(var i = 0; i < entities.length; i++) {
				entities[i].update(delta);
			}
			
			// Create Enemies
			enemy_timer += delta;
			while (enemy_timer > enemy_delay) {
				entities.push(new Enemy(32+Math.random()*(width-64), -64));
				enemy_timer -= enemy_delay;
			}
		
		// Render
			// Background
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.fillRect(0,0,width, height);
			
			//Stars
			for(var i = 0; i < 100; i++){
				stars[3*i+1] += star_speed*delta*(1+2*stars[3*i+2]);
				stars[3*i+1] = stars[3*i+1] % height;
				
				spritesheet32.render(0,0, Math.round(stars[3*i]),Math.round(stars[3*i+1]));
			}
			
			// Entities
			for(var i = 0; i < entities.length; i++) {
				entities[i].render();
			}
			
			
		// Remove
		for(var i = 0; i < entities.length; i++) {
			if (entities[i].destroy) entities.splice(i,1);
		}
			
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
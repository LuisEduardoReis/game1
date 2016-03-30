

function Game() {

	this.stars = [];
	this.star_speed = 128;

	this.entities = [];
	
	this.last = -1;
	
	this.enemy_timer = 0;
	this.enemy_delay = 1;
	
	this.t = 0;
}
	
Game.prototype.init = function() {
	$("#loading").remove();
	
	canvas = document.getElementById("canvas");
	if (!canvas.getContext) return false;
	ctx = canvas.getContext("2d");	

	ctx.rotateFromCenter = function(angle,x,y) {
		this.translate(x,y);
		this.rotate(angle);		
		this.translate(-x,-y);
	}

	$("#content").append(canvas);

	canvas.width = width;
	canvas.height = height;
	
	return true;
}
	
Game.prototype.start = function() {
	
	this.entities.push(new Player(this, width / 2, height - 64));
	
	for(var i = 0; i < 100; i++) {
		this.stars[3*i+0] = (2*Math.random()-0.5)*width;
		this.stars[3*i+1] = (2*Math.random()-0.5)*height;
		this.stars[3*i+2] = Math.random();
	}

	this.animate();
}

Game.prototype.animate = function(timestamp) {
	requestAnimFrame(this.animate.bind(this));
	if (this.last > 0 && timestamp > 0) {
		var delta = (timestamp - this.last)/1000;
		if (delta > 0.5) delta = 0.5;
		this.render(delta);
	}
	this.last = timestamp;
}
	

Game.prototype.render = function (delta) {
		
	// Update
		this.t += delta;
	
		// Entities
		for(var i = 0; i < this.entities.length; i++) {
			this.entities[i].update(delta);
		}
		
		// Create Enemies
		this.enemy_timer += delta;
		while (this.enemy_timer > this.enemy_delay) {
			this.entities.push(new Enemy(this, 32+Math.random()*(width-64), -64));
			this.enemy_timer -= this.enemy_delay;
		}
	
	// Collisions
		for(var i = 0; i < this.entities.length; i++) {
			var a = this.entities[i];
			for(var j = 0; j < this.entities.length; j++) {
				if (i==j) continue;
				var b = this.entities[j];
				
				if (!(
					(b.x + b.cx) > (a.x + a.cx + a.width)  ||
					(b.x + b.cx + b.width) < (a.x + a.cx)  ||
					(b.y + b.cy) > (a.y + a.cy + a.height) ||
					(b.y + b.cy + b.height) < (a.y + a.cy)
				)) {
					this.entities[i].collision(this.entities[j]);
				}
			}
		}
	
	// Render
		// Background
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillRect(0,0,width, height);
		
		ctx.rotateFromCenter(this.t/10,width/2,height/2);
		
		
		//Stars
		for(var i = 0; i < 100; i++){
			this.stars[3*i+1] += this.star_speed*delta*(1+2*this.stars[3*i+2]);
			this.stars[3*i+1] = this.stars[3*i+1] % height;
			
			spritesheet16.render(0,0, this.stars[3*i],this.stars[3*i+1]);
		}
		
		// Entities
		for(var i = 0; i < this.entities.length; i++) {
			this.entities[i].render();
		}
		
		ctx.rotateFromCenter(-this.t/10,width/2,height/2);

		
	// Remove
		for(var i = 0; i < this.entities.length; i++) {
			if (this.entities[i].destroy) this.entities.splice(i,1);
		}
		
}
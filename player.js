function Player(game, x,y) {
	var size = 32;
	Entity.call(this, game, x,y, size,size);
	this.type = Player;
	
	this.speed = 512;
	
	this.gun_timer = 0;
	this.gun_delay = 1/10;
	
	this.update = function (delta) {
		if (keysDown[38]) this.y -= this.speed * delta;
		if (keysDown[40]) this.y += this.speed * delta;
		if (keysDown[37]) this.x -= this.speed * delta;
		if (keysDown[39]) this.x += this.speed * delta;
		
		this.gun_timer += delta;
		while(this.gun_timer > this.gun_delay) {
			this.game.entities.push(new Bullet(this.game, this.x+16,this.y));		
			this.game.entities.push(new Bullet(this.game, this.x-16,this.y));		
			this.gun_timer -= this.gun_delay;
		}
		
		this.x = Math.min(Math.max(size/2, this.x), width-size/2);
		this.y = Math.min(Math.max(size/2, this.y), height-size/2);
	}
	this.render = function () {
		ctx.drawImage(testImg,this.x+this.cx,this.y+this.cy);		
	}
	
	return this;
}
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
Player.prototype.isType = function(type)  { return type === "Player" || Entity.prototype.isType.call(this,type);}
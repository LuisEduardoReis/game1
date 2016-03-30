

function Entity(x,y, width,height) {
	
	this.x = x;
	this.y = y;
	
	this.vx = 0;
	this.vy = 0;
	
	this.width = width;
	this.height = height;
	
	this.destroy = false;
	
	return this;
}
Entity.prototype.constructor = Entity;
Entity.prototype.update = function (delta) {
	this.x += delta*this.vx;
	this.y += delta*this.vy;
}
Entity.prototype.render = function () {}


function Player(x,y) {
	var size = 32;
	Entity.call(this, x,y, size,size);
	
	this.speed = 512;
	
	this.update = function (delta) {
		if (keysDown[38]) this.y -= this.speed * delta;
		if (keysDown[40]) this.y += this.speed * delta;
		if (keysDown[37]) this.x -= this.speed * delta;
		if (keysDown[39]) this.x += this.speed * delta;
		
		this.x = Math.min(Math.max(size/2, this.x), width-size/2);
		this.y = Math.min(Math.max(size/2, this.y), height-size/2);
	}
	this.render = function () {
		ctx.drawImage(testImg,this.x-size/2,this.y-size/2);		
	}
	
	return this;
}
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;


function Enemy(x,y) {
	var size = 32;
	Entity.call(this, x,y, size,size);
	
	this.vy = 128;
	
	return this;
}
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(delta) {
	Entity.prototype.update.call(this, delta);
	
	if (this.y > height+this.height) this.destroy = true;
}

Enemy.prototype.render = function() {
	ctx.drawImage(testImg,this.x,this.y);
}	
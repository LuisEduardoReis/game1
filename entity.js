

function Entity(game, x,y, width,height) {
	this.game = game;
	
	this.x = x;
	this.y = y;
	
	this.vx = 0;
	this.vy = 0;
	
	this.width = width;
	this.height = height;
	
	this.cx = -width/2;
	this.cy = -height/2;
	
	this.health = 100;
	
	this.destroy = false;
	
	return this;
}
Entity.prototype.constructor = Entity;
Entity.prototype.update = function (delta) {
	this.x += delta*this.vx;
	this.y += delta*this.vy;
}
Entity.prototype.render = function () {}

Entity.prototype.collision = function (other) {}

Entity.prototype.damage = function (damage) { this.health = Math.max(0,this.health-damage);}

Entity.prototype.isType = function(type) { return type === "Entity"; }
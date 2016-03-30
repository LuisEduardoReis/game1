function Bullet(game, x,y) {
	Entity.call(this, game, x,y, 4,16);
	
	this.vy = -512;
	
	return this;
}
Bullet.prototype = Object.create(Entity.prototype);
Bullet.prototype.constructor = Bullet;
Bullet.prototype.isType = function(type) { return type === "Bullet" || Entity.prototype.isType.call(this,type);};

Bullet.prototype.update = function(delta) {
	Entity.prototype.update.call(this, delta);
	
	if (this.y < -this.height) this.destroy = true;
}

Bullet.prototype.render = function() {
	spritesheet16.render(0,0, this.x - 8,this.y - 8);
}	
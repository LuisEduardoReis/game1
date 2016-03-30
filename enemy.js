function Enemy(game, x,y) {
	var size = 32;
	Entity.call(this,game, x,y, size,size);
	
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
	ctx.drawImage(testImg,this.x+this.cx,this.y+this.cy);
}	

Enemy.prototype.collision = function (other) { this.destroy = true;}
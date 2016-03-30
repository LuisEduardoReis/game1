function Enemy(game, x,y) {
	var size = 32;
	Entity.call(this,game, x,y, size,size);
	this.type = "Enemy";
	
	this.vy = 128;
	
	return this;
}
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.isType = function(type) { return type === "Enemy" || Entity.prototype.isType.call(this,type);};

Enemy.prototype.update = function(delta) {
	Entity.prototype.update.call(this, delta);
	
	if (this.y > height+this.height) this.destroy = true;
	if (this.health <= 0) this.destroy = true;
}

Enemy.prototype.render = function() {
	
	var rot = Math.PI*(100-this.health)/180 
	ctx.rotateFromCenter(rot,this.x,this.y);	
	ctx.drawImage(testImg,this.x+this.cx,this.y+this.cy);
	ctx.rotateFromCenter(-rot,this.x,this.y);	
}	

Enemy.prototype.collision = function (other) {
	if (other.isType("Bullet"))	this.damage(15);
}
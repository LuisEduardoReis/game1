
var WIDTH = 640;
var HEIGHT = 480;

var canvas, ctx;

var Player = {
	speed: 512,
	x: 0,
	y: 0

}

var stars = [];

var loader = new PxLoader(),
	testImg = loader.addImage('images/test.png'),
	spritesheetImg = loader.addImage('images/spritesheet.png');
	
function SpriteSheet(_img, _size) {
	
	this.img = _img;
	this.size = _size;
		
	this.draw = function (ix,iy, x,y) {
		ctx.drawImage(this.img,
			ix*this.size, iy*this.size,
			this.size, this.size,
			x,y,
			this.size, this.size
		);
	}	
}

var spritesheet32 = new SpriteSheet(spritesheetImg, 16);
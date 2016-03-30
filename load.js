
var width = 480;
var height = 640;

var canvas, ctx;

	
var loader = new PxLoader(),
	testImg = loader.addImage('images/test.png'),
	spritesheetImg = loader.addImage('images/spritesheet.png');
	
function SpriteSheet(_img, _size) {
	
	this.img = _img;
	this.size = _size;
		
	this.render = function (ix,iy, x,y) {
		ctx.drawImage(this.img,
			ix*this.size, iy*this.size,
			this.size, this.size,
			Math.round(x),Math.round(y),
			this.size, this.size
		);
	}	
}

var spritesheet16 = new SpriteSheet(spritesheetImg, 16);
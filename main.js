
var V_WIDTH = 320;
var V_HEIGHT = 240;
var V_SCALE = 2;

var canvas, ctx;

var Player = {
	speed: 256,
	x: 0,
	y: 0
}

function init() {

	$("#loading").remove();
		
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
	$("#content").append(canvas);

	canvas.width = V_WIDTH * V_SCALE;
	canvas.height = V_HEIGHT * V_SCALE;
	
	ctx.scale(V_SCALE, V_SCALE);
	
	Player.x = V_WIDTH / 2;
	Player.y = V_HEIGHT - 32;		

	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0,0,V_WIDTH, V_HEIGHT);
	
	ctx.drawImage(testImg,Player.x-16,Player.y-16);
	
}

loader.addCompletionListener(init);
loader.start();

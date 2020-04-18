
class TestBlock extends GameObject {
	constructor(){
		super();

		this.x = 0;
		this.y = g_canvas.height / 2;

		this.xv = 5;
	}

	update(){
		this.x += this.xv;

		if (this.x < 0 || this.x > g_canvas.width){
			this.xv *= -1;
		}
	}

	draw(g){
		g.fillStyle = 'white';
		g.fillRect(this.x, this.y, 30, 30);
	}
}

const testBlock = new TestBlock();

function mainLoop(){

	updateAllGameObjects();

	const g = g_canvas.context;

	g.fillStyle = 'black';
	g.fillRect(0, 0, g_canvas.width, g_canvas.height);

	drawAllGameObjects(g);
}

function main(){
	g_canvas.appendToDocument();

	window.setInterval(mainLoop, 1000/30);
}

window.onload = main;


class Titanic extends GameObject {
	constructor(){
		super();
		this.x = g_canvas.width/2;
		this.y = 200;
	}

	update(){

	}

	draw(g){
		g.fillStyle = '#777';
		g.fillRect(this.x, this.y, 40, 80);
	}
}
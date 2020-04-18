
// Test/example GameObject.

class TestBlock extends GameObject {
	constructor(){
		super();

		this.x = g_canvas.width / 2;
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

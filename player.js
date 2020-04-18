
class Iceberg extends GameObject {
	constructor(){
		super();
		this.x = g_canvas.width / 2;
		this.y = 500;
		this.cooldown = 0;
		this.health = 100;
	}

	update(){

		const v = 10;
		if (g_input.keysDown['w']){
			this.y -= v;
		}
		if (g_input.keysDown['s']){
			this.y += v;
		}
		if (g_input.keysDown['a']){
			this.x -= v;
		}
		if (g_input.keysDown['d']){
			this.x += v;
		}
		if (g_input.keysDown[' '] && this.cooldown <= 0){
			new PlayerBullet(this.x, this.y);
			this.cooldown = 5;
		}
		this.cooldown--;
	}

	draw(g){
		g.fillStyle = 'white';
		g.fillRect(this.x, this.y, 20, 20);
	}
}


class Iceberg extends GameObject {
	constructor(){
		super();
		this.x = g_canvas.width / 2;
		this.y = 500;
		this.w = 20;
		this.h = 20;
		this.cooldown = 0;
		this.health = 100;

		this.gun = new Gun(this, 3, function(x, y){
			const b = new Bullet();
			b.w = 30;
			b.h = 8;
			b.v = 22;
			b.damage = 10;
			b.color = '#aef';
			b.playerBullet = true;
			return b;
		});
		this.gun.r = -90;
	}

	update(){

		const moveSpeed = 10;
		if (g_input.keysDown['w'] || g_input.keysDown['ArrowUp']){
			this.y -= moveSpeed;
		}
		if (g_input.keysDown['s'] || g_input.keysDown['ArrowDown']){
			this.y += moveSpeed;
		}
		if (g_input.keysDown['a'] || g_input.keysDown['ArrowLeft']){
			this.x -= moveSpeed;
		}
		if (g_input.keysDown['d'] || g_input.keysDown['ArrowRight']){
			this.x += moveSpeed;
		}

		this.gun.firing = g_input.keysDown[' '];
	}

	draw(g){
		g.fillStyle = 'white';
		g.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
	}
}

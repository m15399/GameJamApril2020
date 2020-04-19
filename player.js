
class Iceberg extends GameObject {
	constructor(){
		super();
		this.x = g_canvas.width / 2;
		this.y = 500;
		this.w = 20;
		this.h = 20;

		this.health = 100;
		this.hitThisFrame = false;

		this.gun = new Gun(this, .1, function(x, y){
			const b = new Bullet();
			b.w = 30;
			b.h = 8;
			b.v = 900;
			b.damage = 10;
			b.color = '#aef';
			b.playerBullet = true;
			return b;
		});
		this.gun.r = -90;
		this.gun.angleJitter = 1;

		this.sprite = g_resources.get('berg.png');
	}

	update(){

		this.gun.firing = g_input.keysDown[' '];

		const moveSpeed = 290 * g_dt;
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

		this.x = clamp(this.x, this.w/2, g_canvas.w - this.w/2);
		this.y = clamp(this.y, this.h/2, g_canvas.h - this.h/2);
	}

	draw(g){

		const imageWidth = 45;
		g.drawImage(
			this.sprite,
			this.x - imageWidth/2 + imageWidth * -.05,
			this.y - imageWidth/2 + imageWidth * -.15,
			imageWidth,
			imageWidth);
		
		// Hitbox.
		g.strokeStyle = 'white';
		// g.strokeRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
	}

	hit(){
		this.hitThisFrame = true;
	}
}

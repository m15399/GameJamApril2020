
class Iceberg extends GameObject {
	constructor(){
		super();
		this.x = g_canvas.width / 2;
		this.y = g_canvas.height - 100;
		this.w = 35;
		this.h = this.w;

		this.health = 100;

		this.weaponDisabled = false;

		this.gun = new Gun(this, .1, function(x, y){
			const b = new Bullet();
			b.w = 40;
			b.h = 10;
			b.v = 900;
			b.damage = 10;
			b.color = '#aef';
			b.playerBullet = true;
			return b;
		});
		this.gun.r = -90;
		this.gun.angleJitter = 2;

		this.sprite = g_resources.get('berg.png');
	}

	update(){

		this.gun.firing = !this.weaponDisabled && g_input.keysDown[' '];

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

		const imageWidth = this.w * 2.25;
		g.drawImage(
			this.sprite,
			this.x - imageWidth/2 + imageWidth * -.05,
			this.y - imageWidth/2 + imageWidth * -.15,
			imageWidth,
			imageWidth);
		
		// Hitbox.
		if (isDebugView()){
			g.strokeStyle = 'white';
			g.strokeRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
		}
	}

	hit(){
		g_game.playerHit = true;
		g_game.frameFreeze = 3;
		g_game.shake(.1);
	}
}


function createEnemyBullet(){
	const b = new Bullet();
	b.w = 10;
	b.h = b.w;
	b.v = 10;
	b.color = '#fea';
	return b;
}

function createBlueBullet(){
	const b = createEnemyBullet();
	b.color = '#aef';
	return b;
}

class Titanic extends GameObject {
	constructor(){
		super();
		this.x = g_canvas.width/2;
		this.y = 70;
		this.w = 40;
		this.h = 80;
		this.r = 0;

		this.health = 1000;

		this.gun1 = new Gun(this, 1, createEnemyBullet);
		this.gun1.xOffset = 20;
		this.gun1.yOffset = 30;
		this.gun1.startSweep(90, 120, 7);
		// this.gun3 = new Gun(this, 2, createEnemyBullet);
		// this.gun3.xOffset = -20;
		// this.gun3.yOffset = 30;
		// this.gun3.startSweep(90, 120, 7);

		this.gun2 = new Gun(this, 6, createBlueBullet);
		this.gun2.xOffset = -20;
		this.gun2.yOffset = 30;
		this.gun2.startShotgun(8, 90);
	}

	update(){
		//this.yOffset = Math.min(g_time * 70 - 700, -20);
		// console.log(this.y);
		this.x += Math.sin(g_time * 2) * 2;

		if (this.health < 0) {
			this.destroy();
		}
	}

	draw(g){
		g.fillStyle = '#aaa';
		g.save();
		g.translate(this.x, this.y);
		g.rotate(degreesToRadians(this.r));

		g.fillRect(-this.w/2, -this.h/2, this.w, this.h);

		g.restore();
	}

	hit(damage) {
		this.health -= damage;
	}
}

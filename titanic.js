
class Titanic extends GameObject {
	constructor(){
		super();
		this.x = g_canvas.width/2;
		this.y = 200;
		this.r = 0;
		this.w = 40;
		this.h = 80;

		// Makes it easier to draw MechaTitanic.
		this.xOffset = 0;
		this.yOffset = 0;
		this.rOffset = 0;
		this.cooldown = 5;
		this.health = 1000;
	}

	update(){
		//this.yOffset = Math.min(g_time * 70 - 700, -20);
		// console.log(this.y);
		this.xOffset = Math.sin(g_time * 2) * 20;

		if (this.cooldown <= 0) {
			new EnemyBullet(this.x + this.xOffset, this.y + this.yOffset);
			this.cooldown = 10;
		}

		if (this.health < 0) {
			this.destroy();
		}

		this.cooldown--;
	}

	draw(g){
		g.fillStyle = '#aaa';
		g.save();
		g.translate(this.x + this.xOffset, this.y + this.yOffset);
		g.rotate(degreesToRadians(this.r + this.rOffset));

		g.fillRect(-this.w/2, -this.h/2, this.w, this.h);

		g.restore();
	}

	hit(damage) {
		this.health -= damage;
	}
}

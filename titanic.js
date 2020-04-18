
class Titanic extends GameObject {
	constructor(){
		super();
		this.x = g_canvas.width/2;
		this.y = 200;
		this.r = 0;

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

		this.cooldown--;
	}

	draw(g){
		g.fillStyle = '#aaa';
		g.save();
		g.translate(this.x + this.xOffset, this.y + this.yOffset);
		g.rotate(degreesToRadians(this.r + this.rOffset));

		let w = 40;
		let h = 80;
		g.fillRect(-w/2, -h/2, w, h);

		g.restore();
	}
}


class Titanic extends GameObject {
	constructor(){
		super();
		this.x = g_canvas.width/2;
		this.y = 150;
		this.w = 40;
		this.h = 80;
		this.r = 0;

		this.health = 1000;

		this.gun = new Gun(this, 5, function(){
			const b = new Bullet();
			b.w = 10;
			b.h = 10;
			b.v = 10;
			b.color = '#ffa';
			return b;
		});
	}

	update(){
		//this.yOffset = Math.min(g_time * 70 - 700, -20);
		// console.log(this.y);
		this.x += Math.sin(g_time * 2) * 5;

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

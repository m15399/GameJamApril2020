
class Bullet extends GameObject {
	constructor(){
		super();
		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
		this.r = 0;
		this.v = 0;
		this.color = 'white';
		this.playerBullet = false;
	}

	update(){
		this.y += this.v;

		if (!onscreen(this)) {
			this.destroy();
		}

		if (this.playerBullet){
			if (collided(boss, this)) {
				boss.hit(this.damage);
				this.destroy();
			}
		} else {

		}
   }

   draw(g){
		g.fillStyle = this.color;

		g.save();
		g.translate(this.x, this.y);
		g.rotate(degreesToRadians(this.r));

		g.fillRect(-this.w/2, -this.h/2, this.w, this.h);

		g.restore();
	}
}
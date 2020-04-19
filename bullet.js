
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
		const rads = degreesToRadians(this.r);
		const xv = Math.cos(rads) * this.v * g_dt;
		const yv = Math.sin(rads) * this.v * g_dt;
		this.x += xv;
		this.y += yv;

		if (!onscreen(this)) {
			this.destroy();
		}

		if (this.playerBullet){
			const that = this;
			g_game.forAllEnemies(function(enemy){
				if (!that.destroyed && collided(enemy, that)) {
					enemy.hit(that.damage);
					that.destroy();
				}
			});
		} else {
			if (collided(g_game.iceberg, this)) {
				g_game.iceberg.hit(this.damage);
				this.destroy();
			}
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
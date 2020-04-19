
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
		this.x = 0;
		this.y = 0;
		this.w = 40;
		this.h = 80;
		this.r = 0;

		this.followTarget = false;
		this.targetX = 0;
		this.targetY = 0;

		this.health = 1000;

		this.script = new Script();
		this.startTitanicBossScript();


	}

	startTitanicBossScript(){

		const that = this;
		const script = this.script;
		let gun1, gun2;

		const baseX = g_canvas.width / 2;
		const baseY = 80;
		that.x = g_canvas.width/2;
		that.y = -that.h / 2 - 20;
		that.followTarget = true;
		that.targetX = that.x;
		that.targetY = 80;

		script.after(50, function(){
			that.yv = 0;

		}).after(30)
		.loopBegin()
		.after(0, function(){
			// console.log('shooting stuff!');
		}).after(10, function(){
			gun1 = new Gun(that, 1, createEnemyBullet);
			gun1.xOffset = 20;
			gun1.yOffset = 30;
			gun1.startSweep(90, 120, 7);

		}).after(60, function(){
			gun2 = new Gun(that, 6, createBlueBullet);
			gun2.xOffset = -20;
			gun2.yOffset = 30;
			gun2.startShotgun(8, 90);

		}).after(60, function(){
			gun1.destroy();
			gun2.destroy();
			
		}).after(30, function(){
			that.targetX = baseX + 90;

		}).after(30, function(){
			that.targetX = baseX;
			that.targetY = baseY;

		}).loop();
	}

	update(){
		this.script.update();

		if (this.followTarget){
			const maxV = 3;
			this.x = moveTowards(this.x, this.targetX, maxV);
			this.y = moveTowards(this.y, this.targetY, maxV);
		}

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

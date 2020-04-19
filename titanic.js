
function createEnemyBullet(){
	const b = new Bullet();
	b.w = 10;
	b.h = b.w;
	b.v = 300;
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
		this.followTargetSpeed = 0;
		this.defaultFollowTargetSpeed = 60;
		this.targetX = 0;
		this.targetY = 0;

		this.health = 10000;
		this.hitThisFrame = false;

		this.script = new Script();
		this.startTitanicBossScript();
	}

	startTitanicBossScript(){

		const that = this;
		const script = this.script;
		let gun1, gun2;

		const baseX = g_canvas.width / 2;
		const baseY = 80;

		that.x = baseX;
		that.y = -that.h / 2 - 20;
		that.followTarget = true;
		that.followTargetSpeed = that.defaultFollowTargetSpeed/2;
		that.targetX = that.x;
		that.targetY = 80;

		script.after(5, function(){
			that.followTargetSpeed = that.defaultFollowTargetSpeed;

		}).loopBegin()
		.after(.5, function(){
			gun1 = new Gun(that, .03, createEnemyBullet);
			gun1.xOffset = 20;
			gun1.yOffset = 30;
			gun1.startSweep(90, 120, 210);

		}).after(2, function(){
			gun2 = new Gun(that, .2, createBlueBullet);
			gun2.xOffset = -20;
			gun2.yOffset = 30;
			gun2.startShotgun(8, 90);

		}).after(2, function(){
			gun1.destroy();
			gun2.destroy();

		}).after(1, function(){
			that.targetX = baseX + 90;

		}).after(1, function(){
			that.targetX = baseX;
			that.targetY = baseY;

		}).loop();
	}

	update(){
		this.script.update();

		if (this.followTarget){
			const maxV = this.followTargetSpeed * g_dt;
			this.x = moveTowards(this.x, this.targetX, maxV);
			this.y = moveTowards(this.y, this.targetY, maxV);
		}

		if (this.health < 0) {
			this.destroy();
		}
	}

	draw(g){
		g.fillStyle = '#aaa';
		if (this.hitThisFrame){
			g.fillStyle = 'white';
			this.hitThisFrame = false;
		}

		g.save();
		g.translate(this.x, this.y);
		g.rotate(degreesToRadians(this.r));

		g.fillRect(-this.w/2, -this.h/2, this.w, this.h);

		g.restore();
	}

	hit(damage) {
		this.health -= damage;
		this.hitThisFrame = true;
	}
}

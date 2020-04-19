
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

class Titanic extends Enemy {
	constructor(size){
		super();

		if (size == undefined){
			size = 1;
		}

		this.x = 0;
		this.y = 0;
		this.w = 60 * size;
		this.h = this.w * 2;
		this.r = 0;

		// For MechaTitanic pieces.
		this.useInitialPlusOffset = false;
		this.initialX = 0;
		this.initialY = 0;
		this.offsetX = 0;
		this.offsetY = 0;

		this.followTarget = false;
		this.followTargetSpeed = 0;
		this.defaultFollowTargetSpeed = 60;
		this.targetX = 0;
		this.targetY = 0;

		this.health = 100;
		this.hitThisFrame = false;

		this.sprite = g_resources.get('titanic.png');
		this.spriteWidth = this.w * 2; // How big to actually draw the sprite.
		this.spriteHeight = this.spriteWidth * 2;
		this.hitOverlayCanvas = new Canvas(this.spriteWidth, this.spriteHeight);
		
		this.script = new Script();
	}

	startTitanicBossScript(){
		const that = this;
		const script = this.script;
		let gun1, gun2;

		const baseX = g_canvas.width / 2;
		const baseY = 140;

		that.x = baseX;
		that.y = -that.h * 1;

		script.after(5, function(){
			g_game.iceberg.weaponDisabled = true;

			that.followTarget = true;
			that.followTargetSpeed = that.defaultFollowTargetSpeed * .7;
			that.targetX = baseX;
			that.targetY = baseY;
			g_game.startMildShake(1);

		}).after(6.2, function(){
			that.followTargetSpeed = that.defaultFollowTargetSpeed;
			g_game.stopMildShake();
			g_game.iceberg.weaponDisabled = false;

		}).loopBegin()
		.after(0, function(){
			gun1 = new Gun(that, .06, createEnemyBullet);
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

	startMiniTitanicScript(){
		const that = this;
		const script = this.script;
		let gun1, gun2;

		script.loopBegin()
		.after(0, function(){
			gun1 = new Gun(that, .08, createEnemyBullet);
			gun1.startSweep(90, 120, 210);

		}).after(5, function(){
			gun1.destroy();

			gun2 = new Gun(that, .5, createBlueBullet);
			gun2.startShotgun(12, 135);

		}).after(2, function(){
			gun2.destroy();

		}).loop();
	}

	update(){
		this.script.update();

		if (this.followTarget){
			const maxV = this.followTargetSpeed * g_dt;
			this.x = moveTowards(this.x, this.targetX, maxV);
			this.y = moveTowards(this.y, this.targetY, maxV);
		} else if (this.useInitialPlusOffset){
			this.x = this.initialX + this.offsetX;
			this.y = this.initialY + this.offsetY;
		}

		if (this.health < 0) {
			this.destroy();
		}
	}

	draw(g){
		g.save();
		g.translate(this.x, this.y);
		g.save();
		g.rotate(degreesToRadians(this.r));

		// Draw ship.
		g.drawImage(
			this.sprite, 
			-this.spriteWidth/2, 
			-this.spriteHeight/2, 
			this.spriteWidth,
			this.spriteHeight);

		// Draw on-hit overlay.
		const g2 = this.hitOverlayCanvas.context;
		g2.clearRect(0, 0, this.hitOverlayCanvas.width, this.hitOverlayCanvas.height);
	
		if (this.hitThisFrame){
			g2.drawImage(this.sprite, 0, 0, this.spriteWidth, this.spriteHeight);
			g2.save();
			g2.globalCompositeOperation = 'source-in';
			g2.fillStyle = 'rgba(255, 255, 255, .47)';
			g2.fillRect(0, 0, this.hitOverlayCanvas.width, this.hitOverlayCanvas.height);
			g2.restore();
			this.hitThisFrame = false;
		}

		g.drawImage(
			this.hitOverlayCanvas.canvas,
			-this.hitOverlayCanvas.width/2,
			-this.hitOverlayCanvas.height/2,
			this.hitOverlayCanvas.width,
			this.hitOverlayCanvas.height);

		g.restore();

		// Draw hitbox - note it's not rotated...
		if (isDebugView()){
			g.strokeStyle = 'white';
			g.strokeRect(-this.w/2, -this.h/2, this.w, this.h);
		}

		g.restore();
	}

	hit(damage) {
		// console.log('ow!');
		this.health -= damage;
		this.hitThisFrame = true;
	}
}

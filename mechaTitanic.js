
class MechaTitanic extends Enemy {

	constructor(){
		super();

		this.x = 0;
		this.y = 0;
		this.r = 0;


		this.followTarget = false;
		this.defaultFollowTargetSpeed = 60;
		this.followTargetSpeed = this.defaultFollowTargetSpeed;
		this.targetX = 0;
		this.targetY = 0;

		this.titanics = [];
		this.shootingTanics = [];

		const that = this;

		function moreTitanics(x, y, r, size, shooting){
			size = .8 * size;
			const titanic = new Titanic(size);
			titanic.x = x + g_canvas.width/2;
			titanic.y = y + g_canvas.height/2 - 140;
			titanic.r = r;

			titanic.health = 500;

			titanic.useInitialPlusOffset = true;
			titanic.initialX = titanic.x;
			titanic.initialY = titanic.y;
			titanic.offsetX = 0;
			titanic.offsetY = 0;

			that.titanics.push(titanic);

			if (shooting){
				that.shootingTanics.push(titanic);
			}
		}

		const eyeWidth = 25;
		const eyeHeight = -105;
		const eyeSize = .3;
		const shoulderWidth = 100;
		const armWidth = 140;
		const armHeight = 90;
		const legWidth = 67.5;
		const legHeight = 160;

		moreTitanics(0, -80, 180, 1, true); // Head

		moreTitanics(eyeWidth, eyeHeight, 60, eyeSize, false);
		moreTitanics(-eyeWidth, eyeHeight, -60, eyeSize, false);

		moreTitanics(-shoulderWidth, 15, 45, 1, false);
		moreTitanics(shoulderWidth, 15, -45, 1, false);

		moreTitanics(-armWidth, armHeight, 0, 1, true);
		moreTitanics(armWidth, armHeight, 0, 1, true);

		moreTitanics(-45, 20, 0, 1, false); // Body
		moreTitanics(0, 20, 0, 1, false);
		moreTitanics(45, 20, 0, 1, false);

		moreTitanics(-22.5, 105, 0, 1, false);
		moreTitanics(22.5, 105, 0, 1, false);

		moreTitanics(-legWidth, legHeight, 0, 1, false);
		moreTitanics(legWidth, legHeight, 0, 1, false);

		moreTitanics(-legWidth, legHeight + 85, 0, 1, false);
		moreTitanics(legWidth, legHeight + 85, 0, 1, false);

		this.script = new Script();
		this.startScript();
	}

	startScript(){
		const that = this;
		const script = this.script;

		const baseX = g_canvas.width / 2;
		const baseY = -90;

		that.x = baseX;
		that.y = -600;

		g_game.iceberg.weaponDisabled = true;

		script.after(0, function(){

			that.followTarget = true;
			that.followTargetSpeed = that.defaultFollowTargetSpeed;
			that.targetX = baseX;
			that.targetY = baseY;
			g_game.startMildShake(1);

		}).after(8.2, function(){
			that.followTargetSpeed = that.defaultFollowTargetSpeed;
			g_game.stopMildShake();
			g_game.iceberg.weaponDisabled = false;

		}).after(2.5, function(){
			for(let i = 0; i < that.shootingTanics.length; i++){
				that.shootingTanics[i].startMiniTitanicScript();
			}
		});
	}

	destroy(){
		super.destroy();
		for(let i = 0; i < this.titanics.length; i++){
			this.titanics[i].destroy();
		}
	}

	update(){
		this.script.update();


		if (this.followTarget){
			const maxV = this.followTargetSpeed * g_dt;
			// this.x = moveTowards(this.x, this.targetX, maxV);
			this.y = moveTowards(this.y, this.targetY, maxV);
		}

		this.x = Math.sin(g_time * 2) * 30;

		let numAlive = 0;
		for(let i = 0; i < this.titanics.length; i++){
			const titanic = this.titanics[i];
			titanic.offsetX = this.x;
			titanic.offsetY = this.y;
			if (!titanic.destroyed){
				numAlive++;
			}
		}

		if (numAlive == 0){
			console.log('yay!');
			this.destroy();
		}
	}
}
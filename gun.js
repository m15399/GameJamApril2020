

class Gun extends GameObject {
	constructor(parentObject, cooldown, bulletCreateFunction){
		super();

		this.firing = true;

		this.parentObject = parentObject;
		this.xOffset = 0;
		this.yOffset = 0;
		this.x = this.parentObject.x + this.xOffset;
		this.y = this.parentObject.y + this.yOffset;
		this.r = 90;

		this.angleJitter = 0;

		this.sweeping = false;
		this.sweepDirection = 1;
		this.sweepMidAngle = 0;
		this.sweepAngle = 0;
		this.sweepSpeed = 0;

		this.shotgun = false;
		this.shotgunCount = 1;
		this.shotgunSpreadAngle = 0;

		this.cooldown = cooldown;
		this.currCooldown = cooldown;

		this.bulletCreateFunction = bulletCreateFunction;
	}

	startSweep(midAngle, sweepAngle, speed){
		this.sweeping = true;
		this.sweepMidAngle = midAngle;
		this.sweepAngle = sweepAngle;
		this.sweepSpeed = speed;
		this.sweepDirection = 1;
	}

	startShotgun(count, spreadAngle){
		this.shotgun = true;
		this.shotgunCount = count;
		this.shotgunSpreadAngle = spreadAngle;
	}

	update(){
		if (this.parentObject.destroyed){
			this.destroy();
			return;
		}

		this.x = this.parentObject.x + this.xOffset;
		this.y = this.parentObject.y + this.yOffset;

		if (this.sweeping){
			let targetAngle = this.sweepMidAngle + this.sweepDirection * this.sweepAngle / 2;
			this.r = moveTowards(this.r, targetAngle, this.sweepSpeed * g_dt);
			if (floatsEqual(this.r, targetAngle)){
				this.sweepDirection *= -1;
			}
		}
		
		this.currCooldown -= g_dt;
		this.currCooldown = Math.max(this.currCooldown, 0);

		if (this.firing && this.currCooldown <= 0){
			
			let currR = this.r - this.shotgunSpreadAngle / 2;
			for(let i = 0; i < this.shotgunCount; i++){
				const bullet = this.bulletCreateFunction();
				bullet.x = this.x;
				bullet.y = this.y;
				bullet.r = currR + randomRange(-this.angleJitter, this.angleJitter);
				currR += this.shotgunSpreadAngle / (this.shotgunCount - 1);
			}

			this.currCooldown += this.cooldown;
		}
	}
}

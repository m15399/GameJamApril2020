
class Gun extends GameObject {
	constructor(parentObject, cooldown, bulletCreateFunction){
		super();

		this.firing = true;

		this.parentObject = parentObject;
		this.x = this.parentObject.x;
		this.y = this.parentObject.y;
		this.r = 0;

		this.cooldown = cooldown;
		this.currCooldown = cooldown;

		this.bulletCreateFunction = bulletCreateFunction;
	}

	update(){
		if (this.parentObject.destroyed){
			this.destroy();
			return;
		}

		this.x = this.parentObject.x;
		this.y = this.parentObject.y;
		
		this.currCooldown--;
		if (this.firing && this.currCooldown <= 0){
			
			const bullet = this.bulletCreateFunction();
			bullet.x = this.x;
			bullet.y = this.y;
			bullet.r = this.r;

			this.currCooldown = this.cooldown;
		}
	}
}

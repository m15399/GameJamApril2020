
class MechaTitanic extends GameObject {

	constructor(){
		super();

		this.x = 0;
		this.y = -20;
		this.r = 0;

		this.titanics = [];

		const that = this;

		function moreTitanics(x, y, r){
			const titanic = new Titanic();
			titanic.x = x + g_canvas.width/2;
			titanic.y = y + g_canvas.height/2 - 140;
			titanic.r = r;
			that.titanics.push(titanic);
		}

		const shoulderWidth = 100;
		const armWidth = 120;
		const armHeight = 80;
		const legWidth = 67.5;
		const legHeight = 140;

		moreTitanics(0, -70, 180); // Head

		moreTitanics(-shoulderWidth, 15, 45);
		moreTitanics(shoulderWidth, 15, -45);

		moreTitanics(-armWidth, armHeight, 0);
		moreTitanics(armWidth, armHeight, 0);

		moreTitanics(-45, 20, 0); // Body
		moreTitanics(0, 20, 0);
		moreTitanics(45, 20, 0);

		moreTitanics(-22.5, 105, 0);
		moreTitanics(22.5, 105, 0);

		moreTitanics(-legWidth, legHeight, 0);
		moreTitanics(legWidth, legHeight, 0);

		moreTitanics(-legWidth, legHeight + 85, 0);
		moreTitanics(legWidth, legHeight + 85, 0);
	}

	destroy(){
		super.destroy();
		for(let i = 0; i < this.titanics.length; i++){
			this.titanics[i].destroy();
		}
	}

	update(){

		this.y = Math.min(g_time * 70 - 700, -20);
		// console.log(this.y);
		this.x = Math.sin(g_time * 2) * 20;

		for(let i = 0; i < this.titanics.length; i++){
			const titanic = this.titanics[i];
			titanic.xOffset = this.x;
			titanic.yOffset = this.y;
			titanic.rOffset = this.r;
		}
	}
}
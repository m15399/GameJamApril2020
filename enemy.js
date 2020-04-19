
class Enemy extends GameObject {
	constructor(){
		super();
		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
		g_game.addEnemy(this);
	}

	onDestroy(){
		g_game.deleteEnemy(this);
	}
}

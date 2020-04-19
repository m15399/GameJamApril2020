
class Game {

	constructor(){
		this.iceberg = null;
		this.boss = null;
	}

	startLevel1(){
		this.iceberg = new Iceberg();
		this.boss = new Titanic();
	}

}

const g_game = new Game();
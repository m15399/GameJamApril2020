
class Game {

	constructor(){
		this.iceberg = null;

		// Make the game freeze for one frame for effect.
		this.frameFreeze = 0;

		this.screenShakeTime = 0;
		this.mildScreenShake = 0;
		this.playerHit = false;

		this.enemies = new Set();

		this.level = 0;
	}

	startLevel(number){

		if (!this.ocean) {
			this.ocean = new Ocean();
		}

		if (!this.iceberg){
			this.iceberg = new Iceberg();
		}

		// Clear enemy bullets so you don't die.
		forAllGameObjectsOfType('Bullet', function(b){
			// if (!b.playerBullet){
				b.destroy();
			// }
		});

		switch(number){
		case 0:
			// g_music.restart(0, 9.65);
			g_music.restart(0, 10.56);
			new TitleScreen();
			break;
		case 1:
			g_music.restart();
			const t = new Titanic();
			t.startTitanicBossScript();
			break;
		case 2:
			g_music.restart(21.6);
			const mt = new MechaTitanic();
			break;
		case 3:
			g_music.restart();
			new EndGameScreen();
			break;
		}

		this.level = Math.min(number, 100);
	}

	addEnemy(e){
		this.enemies.add(e);
	}

	deleteEnemy(e){
		this.enemies.delete(e);
	}

	forAllEnemies(func){
		this.enemies.forEach((o) => func(o));
	}

	shake(time){
		this.screenShakeTime = Math.max(this.screenShakeTime, time);
	}

	startMildShake(amount){
		this.mildScreenShake = amount;
	}

	stopMildShake(){
		this.mildScreenShake = 0;
	}

	update(){
		// When all the enemies are dead, advance to the next level.
		// Obviously if there are no enemies in the level this is not going to work... :)
		if (this.enemies.size == 0){
			this.level++;
			this.startLevel(this.level);
		}
	}

	preDraw(g){
		// Apply screen shake.
		g.save();
		const furosity =  5;
		if (this.screenShakeTime > 0){
			g.translate(
				randomRange(-furosity, furosity),
				randomRange(-furosity, furosity));
			this.screenShakeTime -= g_dt;
		}

		const mildFurosity =  1.6 * this.mildScreenShake;
		if (this.mildScreenShake){
			g.translate(
				randomRange(-mildFurosity, mildFurosity),
				randomRange(-mildFurosity, mildFurosity));
		}
	}

	postDraw(g){
		// Draw hit flinch.
		if (this.playerHit){
			this.playerHit = false;

			g.fillStyle = 'rgba(255, 155, 155, .5)';
			g.fillRect(0, 0, g_canvas.width, g_canvas.height);
		}

		g.restore();
	}
}

const g_game = new Game();

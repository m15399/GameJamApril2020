
class Music {
	constructor(){
		this.music = null;
		this.muted = false;
		this.defaultStartPoint = 59.4;
		this.startPoint = this.defaultStartPoint;
		this.customEndPoint = null;
	}

	start(){
		this.music = g_resources.get('music.mp3');
		this.music.play();
	}

	restart(startPoint, customEndPoint){
		this.music.currentTime = startPoint || 0;
		this.customEndPoint = customEndPoint || null;
	}

	// testStartPoint(startPoint){
	// 	this.startPoint = startPoint;
	// 	this.music.currentTime = this.music.duration - 4;
	// }

	update(){
		if (!this.music){
			return;
		}

		const endPoint = this.customEndPoint || this.music.duration;

		if (this.music.currentTime + g_dt * 3 > endPoint){
			this.music.currentTime = Math.max(
				this.music.currentTime - endPoint + this.startPoint,
				0);
			this.music.play();
		}

		if (g_input.keysPressed['m']){
			if (!this.muted){
				this.music.volume = 0;
				this.muted = true;
			} else {
				this.music.volume = 1;
				this.muted = false;
			}
		}
	}
}

const g_music = new Music();

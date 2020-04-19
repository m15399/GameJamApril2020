
class Music {
	constructor(){
		this.music = null;
		this.startPoint = 59.4;
	}

	start(){
		this.music = g_resources.get('music.mp3');
		this.music.play();
	}

	testStartPoint(startPoint){
		this.startPoint = startPoint;
		this.music.currentTime = this.music.duration - 4;
	}

	update(){
		if (!this.music){
			return;
		}

		if (this.music.currentTime + g_dt * 3 > this.music.duration){
			this.music.currentTime = this.music.currentTime - this.music.duration + this.startPoint;
			this.music.play();
		}
	}
}

const g_music = new Music();

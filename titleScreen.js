
class TitleScreen extends Enemy {
	constructor(){
		super();

		this.text1 = 'Titanic!';
		this.text2 = '';
		this.pressSpaceText = '';

		this.okToStart = false;
		this.sprite = g_resources.get('title.png');
		this.script = new Script();
		const that = this;
		this.script.after(1, function(){
			that.text2 = 'subbtitle!';
		}).loopBegin()
		.after(.5, function(){
			that.okToStart = true;
			that.pressSpaceText = '- press SPACE to start -';
		}).after(.5, function(){
			that.pressSpaceText = '';
		}).loop();
	}

	update(){
		this.script.update();

		if (this.okToStart && g_input.keysPressed[' ']){
			this.destroy();
		}
	}

	draw(g){
		g.drawImage(
			this.sprite,
			0,
			0,
			800,
			800);
		g.fillStyle = 'white';
		g.font = '20px Arial';
		g.save();
		g.textAlign = 'center';

		let x = g_canvas.width / 2;
		let y = g_canvas.height / 2;
		g.fillText(this.text1, x, y);
		y += 25;
		g.fillText(this.text2, x, y);
		y += 25;
		g.fillText(this.pressSpaceText, x, y);

		g.restore();
	}
}

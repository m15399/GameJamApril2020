
class EndGameScreen extends Enemy {
	constructor(){
		super();

		this.text1 = 'You win!';
		this.text2 = '';
		this.text3 = '';

		this.script = new Script();
		const that = this;
		this.script.after(1, function(){
			that.text2 = 'Congrats!';
		}).after(1, function(){
			that.text3 = 'B+ I would say.';
		});
	}

	update(){
		this.script.update();
	}

	draw(g){
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
		g.fillText(this.text3, x, y);

		g.restore();
	}
}

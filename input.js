
class Input {
	constructor(){
		this.keysDown = {};

		const that = this;
		window.addEventListener('keydown', (e) => {
			that.keysDown[e.key] = true;
		});
		window.addEventListener('keyup', (e) => {
			that.keysDown[e.key] = false;
		});
	}
}

const g_input = new Input();

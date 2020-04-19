
class Input {
	constructor(){
		this.keysDown = {};

		const that = this;
		window.addEventListener('keydown', (e) => {
			// console.log(e.key);
			that.keysDown[e.key] = true;
		});
		window.addEventListener('keyup', (e) => {
			that.keysDown[e.key] = false;
		});
	}
}

const g_input = new Input();


class Input {
	constructor(){
		this.keysDown = {};
		this.keysPressed = {}; // Keys pressed this frame

		const that = this;
		window.addEventListener('keydown', (e) => {
			// console.log(e.key);
			if (e.key == ' ' ||
				e.key.startsWith('Arrow')){
				e.preventDefault();				
			}
			that.keysDown[e.key] = true;
			that.keysPressed[e.key] = true;
		});
		window.addEventListener('keyup', (e) => {
			that.keysDown[e.key] = false;
		});
	}

	update(){
		this.keysPressed = {};
	}
}

const g_input = new Input();

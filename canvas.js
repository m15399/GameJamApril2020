
class Canvas {

	constructor(width, height){
		this.width = width;
		this.height = height;

		// Support rect "interface"
		this.x = width/2;
		this.y = height/2;
		this.w = width;
		this.h = height;

		this.canvas = document.createElement('canvas');
		this.canvas.width = width;
		this.canvas.height = height;
		this.context = this.canvas.getContext('2d');
	}

	appendToDocument(parentNode){
		parentNode.appendChild(this.canvas);
	}
}

const g_canvas = new Canvas(800, 800);

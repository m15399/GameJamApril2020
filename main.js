function mainLoop(){

	updateTime();

	updateAllGameObjects();

	const g = g_canvas.context;

	// Clear screen.
	g.fillStyle = '#14a';
	g.fillRect(0, 0, g_canvas.width, g_canvas.height);

	drawAllGameObjects(g);
}

function main(){
	// Initialization.
	g_canvas.appendToDocument();

	//new MechaTitanic();

  // Call mainLoop 30 times/sec.
	window.setInterval(mainLoop, 1000/30);
}

function collided(rect1, rect2) {
	if ( rect1.x - rect1.w/2 < rect2.x + rect2.w/2
		&& rect1.x + rect1.w/2 > rect2.x - rect2.w/2
		&& rect1.y - rect1.h/2 < rect2.y + rect2.h/2
		&& rect1.y + rect1.h/2 > rect2.y - rect2.h/2
	) {
		//console.log("hit!");
		return true;
	}
	return false;
}

window.onload = main;
// set up the scene
const iceberg = new Iceberg();
const boss = new Titanic();

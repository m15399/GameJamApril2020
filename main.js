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

window.onload = main;

// set up the scene
const iceberg = new Iceberg();
const boss = new Titanic();

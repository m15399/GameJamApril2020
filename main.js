
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

	// Set up the scene.
	// new Titanic();
	new MechaTitanic();
	new Iceberg();

	// Call mainLoop 30 times/sec.
	window.setInterval(mainLoop, 1000/30);
}

window.onload = main;

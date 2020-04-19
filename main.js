
let g_startTime = new Date().getTime() / 1000;
let g_time = 0;
let g_dt = 1/60;

let lastTime = g_time - g_dt;

function mainLoop(){

	g_time = (new Date().getTime() / 1000) - g_startTime;
	g_dt = g_time - lastTime;

	updateAllGameObjects();

	const g = g_canvas.context;

	// Clear screen.
	g.fillStyle = '#14a';
	g.fillRect(0, 0, g_canvas.width, g_canvas.height);

	drawAllGameObjects(g);

	// Have to do this here to draw after everything else...
	if (iceberg.hitThisFrame){
		iceberg.hitThisFrame = false;

		g.fillStyle = 'rgba(255, 155, 155, .5)';
		g.fillRect(0, 0, g_canvas.width, g_canvas.height);
	}

	lastTime = g_time;
	window.requestAnimationFrame(mainLoop);
}

function main(){
	g_canvas.appendToDocument();

	//new MechaTitanic();

	mainLoop();
}

window.onload = main;

// set up the scene
const iceberg = new Iceberg();
const boss = new Titanic();

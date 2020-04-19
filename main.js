
let g_time = 0;
let g_dt = 1/60;

let startTime = new Date().getTime() / 1000;
let lastTime = g_time - g_dt;

let loadingResources = true;

function mainLoop(){

	g_time = (new Date().getTime() / 1000) - startTime;
	g_dt = g_time - lastTime;
	g_dt = clamp(g_dt, 0, 1/10);

	const g = g_canvas.context;

	if (loadingResources){
		// Draw loading screen, but only if it's taking a long time to load stuff.
		g.fillStyle = 'black';
		g.fillRect(0, 0, g_canvas.width, g_canvas.height);
		if (g_time > 1){
			g.fillStyle = 'white';
			g.font = '20px Arial';
			g.fillText('Loaded ' + g_resources.numLoaded + '/' + g_resources.numResources, 20, 30);
		}

		if (g_resources.numLoaded == g_resources.numResources){
			loadingResources = false;
			g_game.startLevel1();
		}

	} else {

		updateAllGameObjects();

		// Clear screen.
		g.fillStyle = '#14a';
		g.fillRect(0, 0, g_canvas.width, g_canvas.height);

		drawAllGameObjects(g);

		// Have to do this here to draw after everything else...
		if (g_game.iceberg && g_game.iceberg.hitThisFrame){
			g_game.iceberg.hitThisFrame = false;

			g.fillStyle = 'rgba(255, 155, 155, .5)';
			g.fillRect(0, 0, g_canvas.width, g_canvas.height);
		}
	}

	lastTime = g_time;
	window.requestAnimationFrame(mainLoop);
}

function main(){
	g_canvas.appendToDocument();

	//new MechaTitanic();

	g_resources.loadImage('berg.png');

	mainLoop();
}

window.onload = main;

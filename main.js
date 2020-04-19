
let g_time = 0;
let g_dt = 1/60;

let startTime = new Date().getTime() / 1000;
let lastTime = g_time - g_dt;

let loadingResources = true;

function mainLoop(){

	g_time = (new Date().getTime() / 1000) - startTime;
	g_dt = g_time - lastTime;
	g_dt = clamp(g_dt, 0, 1/10);

	g_music.update();

	if (g_game.frameFreeze > 0){
		g_dt = 1/60/1000;
		g_game.frameFreeze--;
	}

	const g = g_canvas.context;
	// Clear screen.
	g.fillStyle = '#14a';
	g.fillRect(0, 0, g_canvas.width, g_canvas.height);

	if (loadingResources){
		// Draw loading screen, but only if it's taking a long time to load stuff.
		if (g_time > 1){
			g.fillStyle = 'white';
			g.font = '20px Arial';
			g.fillText('Loaded ' + g_resources.numLoaded + '/' + g_resources.numResources, 20, 30);
		}

		if (g_resources.numLoaded == g_resources.numResources){
			loadingResources = false;

			// Start the game!
			g_music.start();
			g_game.startLevel(0);
		}

	} else {

		updateAllGameObjects();
		g_game.update();

		g_game.preDraw(g);

		drawAllGameObjects(g);

		g_game.postDraw(g);
	}

	g_input.update();

	lastTime = g_time;
	window.requestAnimationFrame(mainLoop);
}

let mainCalled = false;
function main(){
	if (mainCalled){
		return;
	}
	mainCalled = true;

	const gameContainer = document.getElementById('game');
	gameContainer.innerHTML = '';
	g_canvas.appendToDocument(gameContainer);

	//new MechaTitanic();

	g_resources.loadImage('berg.png');
	g_resources.loadImage('titanic.png');
	g_resources.loadAudio('music.mp3');

	mainLoop();
}

// window.onload = main;

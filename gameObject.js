

class GameObject {

	constructor(){
		g_allGameObjects.add(this);
	}

	// Call this to remove the object from the game.
	destroy(){
		g_allGameObjects.delete(this);
	}

	// Overridden by subclasses.
	update(){

	}

	// Overridden by subclasses.
	draw(g){

	}
}


const g_allGameObjects = new Set();

function updateAllGameObjects(){
	g_allGameObjects.forEach((o) => o.update());
}

function drawAllGameObjects(g){
	g_allGameObjects.forEach((o) => o.draw(g));
}

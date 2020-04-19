

class GameObject {

	constructor(){
		newGameObjects.push(this);
		this.destroyed = false;
	}

	// Call this to remove the object from the game.
	destroy(){
		deletedGameObjects.push(this);
		this.destroyed = true;
	}

	// Overridden by subclasses.
	update(){

	}

	// Overridden by subclasses.
	draw(g){

	}
}


const g_allGameObjects = new Set();

let newGameObjects = [];
let deletedGameObjects = [];

function updateAllGameObjects(){
	// Delete deleted game objects.
	for(let i = 0; i < deletedGameObjects.length; i++){
		g_allGameObjects.delete(deletedGameObjects[i]);
	}
	deletedGameObjects = [];

	// Add new game objects
	for(let i = 0; i < newGameObjects.length; i++){
		g_allGameObjects.add(newGameObjects[i]);
	}
	newGameObjects = [];

	// console.log('Num game objects:', g_allGameObjects.size);

	g_allGameObjects.forEach((o) => o.update());
}

function drawAllGameObjects(g){
	g_allGameObjects.forEach((o) => o.draw(g));
}

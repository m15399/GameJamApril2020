
class GameObject {

	constructor(){
		this.destroyed = false;
		newGameObjects.push(this);
	}

	// Call this to remove the object from the game.
	destroy(){
		if (!this.destroyed){
			this.destroyed = true;
			deletedGameObjects.push(this);
		}
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

function forObjectsOfType(className, func){
	g_allGameObjects.forEach((o) => {
		const className = o.constructor.name;
		if (o.constructor.name == className){
			func(o);
		}
	});
	console.log(numGuns);
}

function updateAllGameObjects(){

	// Add new game objects
	for(let i = 0; i < newGameObjects.length; i++){
		g_allGameObjects.add(newGameObjects[i]);
	}
	newGameObjects = [];

	// Delete deleted game objects.
	for(let i = 0; i < deletedGameObjects.length; i++){
		g_allGameObjects.delete(deletedGameObjects[i]);
	}
	deletedGameObjects = [];

	// console.log('Num game objects:', g_allGameObjects.size);

	g_allGameObjects.forEach((o) => o.update());
}

function drawAllGameObjects(g){
	g_allGameObjects.forEach((o) => o.draw(g));
}


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

	// Overridden by subclasses: react to the actual destruction between frames.
	onDestroy(){
	}

}


const g_allGameObjects = new Set();

let newGameObjects = [];
let deletedGameObjects = [];

function forAllGameObjectsOfType(className, func){
	g_allGameObjects.forEach((o) => {
		if (o.constructor.name == className){
			func(o);
		}
	});
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
		deletedGameObjects[i].onDestroy();
	}
	deletedGameObjects = [];

	// console.log('Num game objects:', g_allGameObjects.size);

	g_allGameObjects.forEach((o) => o.update());
}

function drawAllGameObjects(g){
	g_allGameObjects.forEach((o) => o.draw(g));
}

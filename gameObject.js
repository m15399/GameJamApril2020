

class GameObject {

	constructor(){
		g_allGameObjects.add(this);
	}

	destroy(){
		g_allGameObjects.delete(this);
	}
}


const g_allGameObjects = new Set();

function updateAllGameObjects(){
	g_allGameObjects.forEach((gameObject) => gameObject.update());
}

function drawAllGameObjects(g){
	g_allGameObjects.forEach((gameObject) => gameObject.draw(g));
}

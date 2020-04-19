
function degreesToRadians(a){
	return a * Math.PI / 180;
}

function collided(rect1, rect2) {
	// console.log(rect1.x, rect1.y, rect1.w, rect1.h,
	// 	rect2.x, rect2.y, rect2.w, rect2.h);
	if ( rect1.x - rect1.w/2 < rect2.x + rect2.w/2
		&& rect1.x + rect1.w/2 > rect2.x - rect2.w/2
		&& rect1.y - rect1.h/2 < rect2.y + rect2.h/2
		&& rect1.y + rect1.h/2 > rect2.y - rect2.h/2
	) {
		//console.log("hit!");
		return true;
	}
	return false;
}

function onscreen(rect){
	return collided(g_canvas, rect);
}

function moveTowards(a, b, v){
	let delta = b - a;
	if (Math.abs(delta) <= v){
		return b;
	} else if (delta < 0) {
		return a - v;
	} else {
		return a + v;
	}
}

function floatsEqual(a, b){
	return Math.abs(a - b) < .0001;
}

function clamp(x, a, b){
	if (x < a){
		return a;
	} else if (x > b){
		return b;
	} else {
		return x;
	}
}

function randomRange(a, b){
	return a + Math.random() * (b - a);
}

function isDebugView(){
	return g_input.keysDown['`'];
}

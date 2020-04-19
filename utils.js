
let g_startTime = new Date().getTime() / 1000;
let g_time = g_startTime;

function updateTime(){
	g_time = (new Date().getTime() / 1000) - g_startTime;
}

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
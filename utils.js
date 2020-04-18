
let g_startTime = new Date().getTime() / 1000;
let g_time = g_startTime;

function updateTime(){
	g_time = (new Date().getTime() / 1000) - g_startTime;
}

function degreesToRadians(a){
	return a * Math.PI / 180;
}

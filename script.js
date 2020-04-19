
// Very simple scripting system to get things to happen over time.
//
// Usage:
//   const script = new Script();
//   script.after(delayInSec, function(){
//       doSomething();
//   }).after(delayInSec, function(){
//       doSomethingElse();
//   }).after(...)
//
//   // Then update the script every frame.
//   script.update();
//
class Script {
	constructor(){
		this.steps = [];
		this.loopBeginMark = 0;
		this.currStep = 0;
		this.currDelay = 0;
	}

	after(delay, func){
		this.steps.push({delay: delay, func: func});
		return this;
	}

	loopBegin(){
		this.loopBeginMark = this.steps.length;
		return this;
	}

	loop(){
		this.steps.push({loop: true});
		return this;
	}

	executeNextStep(){
		const nextStep = this.steps[this.currStep];
		if (nextStep.func){
			nextStep.func();
		} else if (nextStep.loop){
			this.currStep = this.loopBeginMark - 1;
		}
	}

	update(){

		this.currDelay += g_dt;
		
		while(this.currStep < this.steps.length){

			const nextStep = this.steps[this.currStep];
			const nextDelay = nextStep.delay ? nextStep.delay : 0;

			if (this.currDelay >= nextDelay){
				this.executeNextStep();
				this.currStep++;
				this.currDelay -= nextDelay;
			} else {
				break;
			}
		}
	}
}


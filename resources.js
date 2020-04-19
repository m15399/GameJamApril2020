
class Resources {
	constructor(){
		this.basePath = 'resources/';
		this.resources = {};
		this.numResources = 0;
		this.numLoaded = 0;
	}

	get(name){
		return this.resources[name].resource;
	}

	loadImage(name){
		const image = new Image();
		const resource = {
			resource: image,
			loaded: false
		};

		this.resources[name] = resource;
		this.numResources++;

		const that = this;
		image.onload = function(){
			resource.loaded = true;
			that.numLoaded++;
		}
		
		image.src = this.basePath + name;
	}

	loadAudio(name){
		const audio = new Audio(this.basePath + name);
		const resource = {
			resource: audio,
			loaded: false
		};

		this.resources[name] = resource;
		this.numResources++;

		const that = this;
		audio.onload = function(){
			resource.loaded = true;
		}
			that.numLoaded++;
	}
}

const g_resources = new Resources();

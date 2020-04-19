
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
}

const g_resources = new Resources();

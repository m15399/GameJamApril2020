class PlayerBullet extends GameObject {
   constructor(){
		super();
      this.x = iceberg.x;
      this.y = iceberg.y;
	}

   isOffscreen() {
      if (this.y < 0) {
         return true;
      }
   }

   update(){
      this.y = this.y - 10;
      if (this.isOffscreen()) {
         this.destroy();
      }
   }

   draw(g){
		g.fillStyle = 'blue';
		g.fillRect(this.x, this.y, 10, 10);
	}
}

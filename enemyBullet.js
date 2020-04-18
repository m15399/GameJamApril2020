class EnemyBullet extends GameObject {
   constructor(x, y){
		super();
      this.x = x;
      this.y = y;
	}

   isOffscreen() {
      if (this.y > g_canvas.height) {
         return true;
      }
   }

   update(){
      this.y = this.y + 10;
      if (this.isOffscreen()) {
         this.destroy();
      }
   }

   draw(g){
		g.fillStyle = 'red';
		g.fillRect(this.x, this.y, 10, 10);
	}
}

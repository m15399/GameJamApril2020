class PlayerBullet extends GameObject {
   constructor(x, y){
		super();
      this.x = x;
      this.y = y;
      this.w = 10;
      this.h = 10;
      this.damage = 100;
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

      if (collided(boss, this)) {
         boss.hit(this.damage);
         this.destroy();
      }
   }

   draw(g){
		g.fillStyle = 'blue';
		g.fillRect(this.x - this.w, this.y - this.h, this.w, this.h);
	}
}

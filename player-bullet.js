class PlayerBullet extends GameObject {
   constructor(){
		super();
	}

   update(){
      
   }

   draw(g){
		g.fillStyle = 'blue';
		g.fillRect(iceberg.x, iceberg.y, 10, 10);
	}
}

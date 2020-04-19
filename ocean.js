class Ocean extends GameObject {
   constructor(){
      super();
      this.x = 0;
      this.y = 0;
      this.sprite = g_resources.get('water-bg-small.png');
   }

   update() {
      //console.log("moving tiles")
      this.x--;
      this.y--;

      if (this.x < -80) {
         this.x += 80;
      }
      if (this.y < -80) {
         this.y += 80;
      }
   }

   draw(g) {
      //console.log("drawing ocean");
      if (!this.pattern)
         this.pattern = g.createPattern(this.sprite, "repeat");
      
      g.fillStyle = this.pattern;
      g.save();
      g.translate(this.x, this.y);
      g.rect(0, 0, g_canvas.width + 2, g_canvas.height + 2);
      g.fill();
      g.restore();
   }
}

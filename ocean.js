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

      if (this.x < g_canvas.width) {
         this.x = 0;
      }
      if (this.y > g_canvas.height) {
         this.y = 0;
      }
   }

   draw(g) {
      //console.log("drawing ocean");
      this.pattern = g.createPattern(this.sprite, "repeat");
      g.fillStyle = this.pattern;
      g.save();
      g.translate(this.x, this.y);
      g.rect(0, 0, g_canvas.width, g_canvas.height);
      g.fill();
      g.restore();
   }
}

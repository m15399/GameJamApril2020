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

      var s = 160;
      if (this.x < -s) {
         this.x += s;
      }
      if (this.y < -s) {
         this.y += s;
      }
   }

   draw(g) {
      //console.log("drawing ocean");
      if (!this.pattern)
         this.pattern = g.createPattern(this.sprite, "repeat");
      
      g.fillStyle = this.pattern;
      g.save();
      g.translate(this.x, this.y);
      g.beginPath();
      g.rect(0, 0, g_canvas.width + 160, g_canvas.height + 160);
      g.closePath();
      g.fill();
      g.restore();
   }
}

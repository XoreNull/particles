Math.PI2 = 2*Math.PI;

class Particle {

  pos = new Vector2D();
  v = new Vector2D();
  a = new Vector2D();

  constructor(x, y, r, c, vx, vy) {
    this.pos.x = x;
    this.pos.y = y;
  
    this.r = r;
    this.c = c;

    this.v.x = vx;
    this.v.y = vy;
  }

  /**
   * 
   * @param {SketchBase} timer 
   */
  update(sketch) {

    this.v.add(this.a);
    this.a.reset();
    
    this.pos.x += this.v.x * sketch.timer.delta;
    this.pos.y += this.v.y * sketch.timer.delta;

    this.pos.wrap(0, 0, sketch.width, sketch.height);    
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   */
  render(ctx) { 
    ctx.fillStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0.0, Math.PI2);
    ctx.fill();
  }
}
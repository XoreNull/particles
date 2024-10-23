
class SketchBase {
  /** @type {HTMLCanvasElement} */
  canvas;
  /** @type {CanvasRenderingContext2D} */
  ctx;
  /** @type {Timer} */
  timer;

  get width() {
    return this.ctx.canvas.width;
  }

  get height() {
    return this.ctx.canvas.height;
  }

  setup() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.timer = new Timer();

    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.tick = this.tick.bind(this);

    this.resizeCanvas();

    window.addEventListener('resize', this.resizeCanvas);
    window.requestAnimationFrame(this.tick);
  }
  
  update() {  
    this.timer.update();
  }

  post() {
    this.timer.post();
  }

  render() {}
  
  canvasResized() {}

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvasResized();
  }

  tick() {

    this.update();
    this.render();
    this.post();

    window.requestAnimationFrame(this.tick);
  }
}


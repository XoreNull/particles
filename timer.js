////////////////////////////////////////////////////////////////////////////////

class Timer {

  #fpsCount = 0;
  #fpsDelta = 0;
  #lastTick = Date.now() / 1000.0;

  frame = 0;
  delta = 0.0;
  fps = 0.0;

  visible = true;

  update() {

    const now = Date.now() / 1000.0;
    this.delta = now - this.#lastTick;
    this.#lastTick = now;

    this.#fpsDelta += this.delta;

    if (this.#fpsDelta > 1.0) {

      const f = 1.0 / this.#fpsDelta;

      this.fps = (this.#fpsCount / this.#fpsDelta) * f;
      this.#fpsCount = 0;

      while (this.#fpsDelta >= 1.0) {
        this.#fpsDelta -= 1.0;
      }
    }
  }

  post() {
    this.#fpsCount += 1;
    this.frame += 1;
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   */
  render(ctx) {

    if (this.visible) {
      ctx.save();

      ctx.fillStyle = "rgb(0,255,0)";
      ctx.font = "16px courier";
      ctx.fillText(`FPS: ${Math.round(this.fps)}`, 10, ctx.canvas.height - 20);

      ctx.restore();
    }

  }
}

////////////////////////////////////////////////////////////////////////////////
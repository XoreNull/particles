
function giefSomeWeirdColors(count) {

  let result = [];

  let c = 128;
  let w = 127;

  let f1 = 0.3;
  let f2 = 0.3;
  let f3 = 0.3;

  let p1 = 0;
  let p2 = 2;
  let p3 = 4;

  for (let i = 0; i < count; i++) {
    let r = Math.round(Math.sin(f1 * i + p1) * w + c);
    let g = Math.round(Math.sin(f2 * i + p2) * w + c);
    let b = Math.round(Math.sin(f3 * i + p3) * w + c);

    result[i] = `rgba(${r},${g},${b},1)`;
  }

  return result;
}


class MySketch extends SketchBase {

  particleCount = 5000;
  particles = [];

  force = {
    pos: new Vector2D(),
    active: false,
    f: 10000.0
  };

  friction = 0.005;

  createParticles() {
    const rnd = () => Math.random() * 2.0 - 1.0;

    let colors = giefSomeWeirdColors(this.particleCount);

    let rdMax = this.height / this.width * 5.00;
    let rdMin = this.height / this.width * 1.00;

    let xd = (this.width - this.width * 0.2) * 0.5;
    let yd = (this.height - this.height * 0.2) * 0.5;

    let cx = this.width * 0.5;
    let cy = this.height * 0.5;

    let vd = this.width * 0.05;

    for (let i = 0; i < this.particleCount; i++) {

      let x = rnd() * xd + cx;
      let y = rnd() * yd + cy;

      let c = colors[i];

      let vx = rnd() * vd;
      let vy = rnd() * vd;


      let rd = Math.random() * rdMax + rdMin;
      let p = new Particle(x, y, rd, c, vx, vy);

      this.particles.push(p);
    }
  }

  setup() {

    window.addEventListener('mousemove', (e) => this.mouseMove(e));
    window.addEventListener('mousedown', (e) => this.mouseDown(e));
    window.addEventListener('mouseup', (e) => this.mouseUp(e));

    super.setup();

    this.createParticles();
  }

  mouseDown(e) {
    console.log(e.clientX, e.clientY);
    this.force.active = true;
    this.force.pos.x = e.clientX;
    this.force.pos.y = e.clientY;
  }

  mouseUp(e) {
    this.force.active = false;
    this.force.pos.x = e.clientX;
    this.force.pos.y = e.clientY;
  }

  mouseMove(e) {
    
    this.force.pos.x = e.clientX;
    this.force.pos.y = e.clientY;
  }

  update() {
    super.update();

    let dbuffer = new Vector2D();

    for (let i = 0; i < this.particles.length; i++) {

      const p = this.particles[i];

      if (this.force.active) {
        p.pos.substract(this.force.pos, dbuffer);

        let l = 1.0 / dbuffer.length;
        let f = l * l * this.force.f * this.force.f;

        dbuffer.normalize();
        dbuffer.scale(f * this.timer.delta);
        p.a.add(dbuffer);


      }


      p.v.scale(1.0 - this.friction);

      let rx = (Math.random() * 2.0 - 1.0) * 5;
      let ry = (Math.random() * 2.0 - 1.0) * 5;

      dbuffer.set(rx, ry);

      p.a.add(dbuffer);

      p.update(this);
    }
  }

  render() {
    super.render();

    this.ctx.save();
    if (this.timer.frame === 0) {

      this.ctx.fillStyle = "rgb(0,0,0)";
    } else {
      this.ctx.fillStyle = "rgb(0,0,0,0.1)";
    }

    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();

    for (let i = 0; i < this.particles.length; i++) {

      const p = this.particles[i];
      p.render(this.ctx);
    }

    this.timer.render(this.ctx);
  }
}


const sketch = new MySketch();

window.addEventListener('load', () => sketch.setup());


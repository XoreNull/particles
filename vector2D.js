class Vector2D {
  x = 0.0;
  y = 0.0;

  constructor(x,y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }
  
  get sqrLength() {
    return this.x * this.x + this.y * this.y;
  }

  get length() {
    return Math.sqrt(this.sqrLength);
  }

  static clone(v) {
    return new Vector2D(v.x, v.y);
  }

  normalize(dst) {
    dst = dst || this;

    const l = this.length;

    dst.x = this.x / l;
    dst.y = this.y / l;

    return dst;
  }

  rotate(r, dst) {
    dst = dst || this;

    const x = dst.x;
    const y = dst.y;

    const c = Math.cos(r);
    const s = Math.sin(r);

    dst.x = c * x - s * y;
    dst.y = s * x + c * y;

    return dst;
  }

  scale(l, dst) {
    dst = dst || this;

    dst.x = this.x * l;
    dst.y = this.y * l;

    return dst;
  }

  substract(v, dst) {
    dst = dst || this;

    dst.x = this.x - v.x;
    dst.y = this.y - v.y;

    return dst;
  }

  add(v, dst) {
    dst = dst || this;

    dst.x = this.x + v.x;
    dst.y = this.y + v.y;
    
    return dst;
  }

  multiply(v, dst) {
    dst = dst || this;

    dst.x = this.x * v.x;
    dst.y = this.y * v.y;

    return dst;    
  }

  dot(v) {
    
    const x = this.x * v.x;
    const y = this.y * v.y;

    return x + y;
  }

  wrap(minX, minY, maxX, maxY, dst) {
    dst = dst || this;

    dst.x = this.x;
    dst.y = this.y;

    while(dst.x < minX) {
      dst.x += maxX;
    }

    while(dst.y < minY) {
      dst.y += maxY;
    }

    dst.x %= maxX;
    dst.y %= maxY;

    return dst;
  }

  reset() {
    this.x = 0;
    this.y = 0;
  }
}
const rand = (min, max) => min + parseInt(Math.random() * max - min);

class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  eql(p) {
    return p.x === this.x && p.y === this.y;
  }

}

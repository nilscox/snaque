const rand = (a, b) => {
  return a + parseInt(Math.random() * (b - a));
};

class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  eql(p) {
    return p.x === this.x && p.y === this.y;
  }

}

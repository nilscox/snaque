'use strict';

const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  eql(point) {
    if (this.x === point.x && this.y === point.y) {
      return true;
    }
    return false;
  }
}


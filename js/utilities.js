'use strict';

const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomPoint = ({ x: [minX, maxX], y: [minY, maxY] }) => {
  return new Point(rand(minX, maxX), rand(minY, maxY));
};

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  eql(point) {
    return this.x === point.x && this.y === point.y;
  }
}

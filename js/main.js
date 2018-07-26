const rand = (a, b) => {
  return a + parseInt(Math.random() * (b - a));
};

class Game {

  constructor() {
    this.canvas = new Canvas(document.getElementById('canvas'));

    const { width, height } = this.canvas.getDimensions();
    this.snake = new Snake(rand(3, width - 6), rand(3, height - 6), 3);

    document.addEventListener('keydown', e => {
      const dir = e.key.toLowerCase().slice('Arrow'.length);

      if (['left', 'right', 'up', 'down'].indexOf(dir) < 0)
        return;

      this.snake.go(dir);
    });

    this.redraw();
  }

  redraw() {
    this.canvas.clear();

    this.snake.draw(this.canvas);
  }

  frame() {
    this.snake.move();
  }

}

class Canvas {

  constructor(domCanvas) {
    this.domCanvas = domCanvas;
    this.context = this.domCanvas.getContext('2d');
  }

  getDimensions() {
    const size = Rectangle.SIZE();

    return {
      width: this.domCanvas.width / size,
      height: this.domCanvas.height / size,
    };
  }

  clear() {
    const { width, height } = this.domCanvas;

    this.context.clearRect(0, 0, width, height);
  }

  rect(x, y, size, color) {
    const { context: ctx } = this;

    ctx.fillStyle = color;
    ctx.fillRect(x * size, y * size, size, size);
  }

}

class Drawable {

  draw() {
    throw new Error('not implemented');
  }

}

class Rectangle extends Drawable {

  static SIZE() {
    return 10;
  }

  constructor(x, y, color) {
    super();

    this.position = { x, y };
    this.color = color;
  }

  draw(canvas) {
    const size = Rectangle.SIZE();
    const { position: p, color } = this;

    canvas.rect(p.x, p.y, size, color);
  }

}

class SnakeHead extends Rectangle {

  constructor(x, y) {
    super(x, y, 'blue');
  }

}

class SnakeBody extends Rectangle {

  constructor(x, y) {
    super(x, y, 'magenta');
  }

}

class Snake extends Drawable {

  constructor(x, y, size) {
    super(x, y);

    this.head = new SnakeHead(x, y);
    this.body = [];

    for (let i = 1; i < size; ++i)
      this.body.push(new SnakeBody(x + i, y));

    this.direction = 'left';
    this.nextDirection = null;
  }

  go(direction) {
    const opp = d => ({
      left:   'right',
      right:  'left',
      up:     'down',
      down:   'up',
    })[d];

    if (opp(direction) === this.direction)
      this.nextDirection = null;
    else
      this.nextDirection = direction;
  }

  move() {
    if (this.nextDirection) {
      this.direction = this.nextDirection;
      this.nextDirection = null;
    }

    const { head, body } = this;
    const [dx, dy] = {
      'left':   [-1,  0],
      'right':  [ 1,  0],
      'up':     [ 0, -1],
      'down':   [ 0,  1],
    }[this.direction];

    for (let i = body.length - 1; i > 0; --i)
      body[i].position = body[i - 1].position;

    body[0].position = head.position;
    head.position = {
      x: head.position.x + dx,
      y: head.position.y + dy,
    };
  }

  draw(canvas) {
    this.head.draw(canvas);
    this.body.forEach(b => b.draw(canvas));
  }

}

class Fruit extends Drawable {

}

const game = new Game();

requestAnimationFrame(function frame() {
  game.frame();
  game.redraw();
  setTimeout(() => requestAnimationFrame(frame), 1000);
});

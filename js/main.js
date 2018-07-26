const rand = (a, b) => {
  return a + parseInt(Math.random() * (b - a));
};

class Game {

  constructor() {
    this.canvas = new Canvas(document.getElementById('canvas'));

    const { width, height } = this.canvas.getDimensions();

    this.snake = new Snake(rand(3, width - 6), rand(3, height - 6), 3);

    const fp = this.randomFruitPosition();
    this.fruit = new Fruit(fp.x, fp.y);

    document.addEventListener('keydown', e => {
      const dir = e.key.toLowerCase().slice('Arrow'.length);

      if (['left', 'right', 'up', 'down'].indexOf(dir) < 0)
        return;

      this.snake.go(dir);
    });

    this.redraw();
  }

  randomFruitPosition() {
    const { width, height } = this.canvas.getDimensions();
    const snakeCells = this.snake.getCells();
    const cells = [];

    for (let i = 0; i < height; ++i) {
      for (let j = 0; j < width; ++j)
        cells.push({ x: j, y: i });
    }

    const availableCells = cells.filter(c => !snakeCells.find(sc => sc.x === c.x && sc.y === c.y));
    const idx = rand(0, availableCells.length);

    return availableCells[idx];
  }

  redraw() {
    this.canvas.clear();

    this.snake.draw(this.canvas);
    this.fruit.draw(this.canvas);
  }

  update() {
    this.snake.move();

    const hp = this.snake.head.position;
    const fp = this.fruit.position;

    if (hp.x === fp.x && hp.y === fp.y) {
      const nfp = this.randomFruitPosition();

      this.snake.grow(2);
      this.fruit = new Fruit(nfp.x, nfp.y);
    }
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
    this.growLeft = 0;
  }

  grow(n) {
    this.growLeft += n;
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

    if (this.growLeft > 0) {
      const p = body[body.length - 1].position;

      this.body.push(new SnakeBody(p.x, p.y));
      --this.growLeft;
    }

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

  getCells() {
    return [
      this.head.position,
      ...this.body.map(b => b.position),
    ];
  }

}

class Fruit extends Rectangle {

  constructor(x, y) {
    super(x, y, 'yellow');
  }

}

const game = new Game();

requestAnimationFrame(function frame() {
  game.update();
  game.redraw();
  setTimeout(() => requestAnimationFrame(frame), 100);
});

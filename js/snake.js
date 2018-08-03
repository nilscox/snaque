class SnakeHead extends Square {

  constructor(p) {
    super(p, 'blue');
  }

}

class SnakeBody extends Square {

  constructor(p) {
    super(p, 'magenta');
  }

}

class Snake extends Drawable {

  constructor(p, size) {
    super(p);

    this.head = new SnakeHead(p);
    this.body = [];

    for (let i = 1; i < size; ++i)
      this.body.push(new SnakeBody(new Point(p.x + i, p.y)));

    this.direction = 'left';
    this.nextDirection = null;
    this.growLeft = 0;
  }

  grow(n) {
    this.growLeft += n;
  }

  draw(canvas) {
    this.body.forEach(b => b.draw(canvas));
    this.head.draw(canvas);
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

      this.body.push(new SnakeBody(new Point(p.x, p.y)));
      --this.growLeft;
    }

    for (let i = body.length - 1; i > 0; --i)
      body[i].position = body[i - 1].position;

    body[0].position = head.position;
    head.position = new Point(head.position.x + dx, head.position.y + dy);
  }

  isDead(width, height) {
    const hp = this.head.position;

    if (this.getCells().filter(c => c.eql(hp)).length > 1)
      return true;

    return hp.x < 0 || hp.y < 0 || hp.x >= width || hp.y >= height;
  }

  getCells() {
    return [
      this.head.position,
      ...this.body.map(b => b.position),
    ];
  }

}

'use strict';

class SnakeHead extends Square {
  constructor(position) {
    super(position, 'limegreen');
  }
}

class SnakeBody extends Square {
  constructor(position) {
    super(position, 'darkgreen');
  }
}

class Snake extends Drawable {
  constructor(position, size) {
    super();

    this.growLeft = 0;

    this.head = new SnakeHead(position);
    this.body = this.getBody(size);

    this.direction = 'left';
    this.nextDirection = null;
  }

  get size() {
    return this.body.length;
  }

  getBody(size) {
    const body = [];

    for (let i = 0; i <= size - 1; i++) {
      body.push(new SnakeBody(new Point(this.head.position.x + i + 1, this.head.position.y)));
    }

    return body;
  }

  grow(n) {
    this.growLeft += n;
  }

  getCells() {
    const cells = [];

    cells.push(this.head.position);

    for (let i = 0; i < this.size - 1; i++) {
      cells.push(this.body[i].position);
    }

    return cells;
  }

  hasCell(cell) {
    return this.getCells().some((c) => c.eql(cell));
  }

  isDead(width, height) {
    const isSnake = this.getCells();
    isSnake.splice(0, 1);

    if (this.head.position.x < 0 || this.head.position.x >= width) {
      return true;
    } else if (this.head.position.y < 0 || this.head.position.y >= height) {
      return true;
    } else if (isSnake.find((b) => b.eql(this.head.position))) {
      return true;
    } else {
      return false;
    }
  }

  isOppositeDirection(direction) {
    const opposite = {
      left: 'right',
      right: 'left',
      up: 'down',
      down: 'up',
    };

    return direction === opposite[this.direction];
  }

  move() {
    if (this.growLeft > 0) {
      const bodyPart = new SnakeBody(this.body[this.size - 1].position.clone());
      this.body.push(bodyPart);
      this.growLeft -= 1;
    }

    if (this.isOppositeDirection(this.nextDirection)) {
      this.nextDirection = null;
    }

    if (this.nextDirection !== null) {
      this.direction = this.nextDirection;
    }

    this.nextDirection = null;

    for (let i = this.size - 1; i > 0; i--) {
      this.body[i].position = this.body[i - 1].position;
    }
    this.body[0].position = this.head.position;

    switch (this.direction) {
      case 'left':
        this.head.position = new Point(this.head.position.x - 1, this.head.position.y);
        break;

      case 'right':
        this.head.position = new Point(this.head.position.x + 1, this.head.position.y);
        break;

      case 'up':
        this.head.position = new Point(this.head.position.x, this.head.position.y - 1);
        break;

      case 'down':
        this.head.position = new Point(this.head.position.x, this.head.position.y + 1);
        break;
    }
  }

  go(direction) {
    if (this.isOppositeDirection(direction)) {
      this.nextDirection = null;
    }

    this.nextDirection = direction;
  }

  draw(canvas) {
    this.head.draw(canvas);

    for (let i = 0; i < this.size - 1; i++) {
      this.body[i].draw(canvas);
    }
  }
}

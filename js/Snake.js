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

    this.size = size;

    this.growLeft = 0;

    this.head = new SnakeHead(position);
    this.body = this.getBody();

    this.direction = 'left';
    this.nextDirection = null;
  }

  getBody() {
    const body = [];

    for (let i = 0; i < this.size - 1; i++) {
      body.push(new SnakeBody(new Point(this.head.position.x + i + 1, this.head.position.y)));
    }

    return body;
  }

  grow(n) {
    this.growLeft += n;
    for (let i = 0; i < n; i++){
      const bodyPart = new SnakeBody(new Point(this.body[this.body.length - 1].position.x, this.body[this.body.length - 1].position.y));
      this.body.push(bodyPart);
    }
    this.size += n;
  }

  getCells() {
    const cells = [];

    cells.push(this.head.position);

    for (let i = 0; i < this.body.length - 1; i++) {
      cells.push(this.body[i].position);
    }

    return cells;
  }

  isDead(width, height) {
    const isSnake = this.getCells();
    isSnake.splice(0, 1);

    if (this.head.position.x < 0 || this.head.position.x >= width) {
      return true;
      
    } else if (this.head.position.y < 0 || this.head.position.y >= height) {
      return true;

    } else if (isSnake.find(b => b.eql(this.head.position))) {
      return true;

    } else {
      return false;
    }
  }

  move() {
    if (this.growLeft > 0) {
      this.growLeft -= 1;
    }

    function oposite(direction) {
      const op = {
        'left': 'right',
        'right': 'left',
        'up': 'down',
        'down': 'up',
      };

      const keys = Object.keys(op);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === direction) {
          return op[keys[i]]
        }
      }
    }

    if (this.nextDirection === oposite(this.direction)) {
      this.nextDirection = null;
    }

    if (this.nextDirection !== null) {
      this.direction = this.nextDirection;
    }

    this.nextDirection = null;

    for (let i = this.body.length - 1; i > 0 ; i--) {
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
    if (this.direction === direction) {
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

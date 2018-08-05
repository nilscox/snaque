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

  move() {
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

    if (this.nextDirection === this.direction || this.nextDirection === oposite(this.direction)) {
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

  draw(canvas) {
    let body = null;

    this.head.draw(canvas);

    for (let i = 0; i < this.size - 1; i++) {
      this.body[i].draw(canvas);
    }
  }
  
}

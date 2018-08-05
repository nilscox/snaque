'use strict';

class Game extends Drawable {
  constructor(width, height) {
    super(); 

    this.width = width;
    this.height = height;

    this.snake = null;
    this.fruit = null;

    this.score = null;
    this.gameOver = false;

    document.addEventListener('keydown', (e) => this.onKeyDown(e));
  }

  init() {
    this.snake = this.createSnake();
    this.fruit = this.createFruit();

    this.score = 0;
    this.gameOver = false;
  }

  createSnake() {
    const x = rand(3, 17);
    const y = rand(3, 17);
    
    const snakePoint = new Point(x, y);

    return new Snake(snakePoint, 3);
  }

  createFruit() {
    let newPosition = getRandomPoint(1, 20);
    const isSnake = this.snake.getCells();

    for (let i = 0; i < isSnake.length - 1; i++) {
      if (newPosition.x === isSnake[i].x, newPosition.y === isSnake[i].y) {
        newPosition = getRandomPoint(1, 20);
      }  
    }

    return new Fruit(newPosition);
  }

  update() {
    if (!this.gameOver) {
      this.snake.move();

      if (this.snake.head.position.x === this.fruit.position.x && this.snake.head.position.y === this.fruit.position.y) {
        this.fruit = this.createFruit();
        this.snake.grow(2);
      }

      if (this.snake.isDead(this.width, this.height)) {
        this.gameOver = true;
        console.log('Game Over');
      };
    }
  }

  onKeyDown(e) {
    switch (e.key) {
      case 'ArrowRight':
        this.snake.go('right');
        break;
      case 'ArrowLeft':
        this.snake.go('left');
        break;
      
      case 'ArrowUp':
        this.snake.go('up');
        break;
      
      case 'ArrowDown':
        this.snake.go('down');
        break;   
    }
  }

  draw(canvas) {
    this.fruit.draw(canvas);
    this.snake.draw(canvas);
  }
}

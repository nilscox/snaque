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
    const x1 = rand(3, 17);
    const y1 = rand(3, 17);

    const x2 = rand(1, 21);
    const y2 = rand(1, 21);

    const snakePoint = new Point(x1, y1);
    const fruitPoint = new Point(x2, y2);

    this.snake = new Snake(snakePoint, 3);
    this.fruit = new Fruit(fruitPoint);

    this.score = 0;
    this.gameOver = false;

  }

  update() {
    this.snake.move();
  }

  onKeyDown(e) {
    switch (e.key) {
      case 'ArrowRight':
        this.snake.nextDirection = 'right';
        break;
      case 'ArrowLeft':
        this.snake.nextDirection = 'left';
        break;
      
      case 'ArrowUp':
        this.snake.nextDirection = 'up';
        break;
      
      case 'ArrowDown':
        this.snake.nextDirection = 'down';
        break;
      
    }
  }

  draw(canvas) {
    this.fruit.draw(canvas);
    this.snake.draw(canvas);
  }
}

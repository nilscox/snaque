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
    this.fruit = new Fruit(this.getRandomFruitPosition());

    this.score = 0;
    this.gameOver = false;
  }

  createSnake() {
    const x = rand(3, 17);
    const y = rand(3, 17);
    
    const snakePoint = new Point(x, y);

    return new Snake(snakePoint, 3);
  }

  getRandomFruitPosition() {
    let fruitPosition = getRandomPoint(1, 20);
    const isSnake = this.snake.getCells();

    for (let i = 0; i < isSnake.length - 1; i++) {
      if (fruitPosition.x === isSnake[i].x, fruitPosition.y === isSnake[i].y) {
        fruitPosition = getRandomPoint(1, 20);
      }  
    }

    return new Point(fruitPosition.x, fruitPosition.y);
  }

  getHightScore() {
    return localStorage.getItem('bestScore');
  }

  setHightScore() {
    return localStorage.setItem('bestScore', this.score);
  }

  update() {
    if (this.gameOver) {
      return;
    }

    this.snake.move();
    this.score += 1;

    if (this.snake.head.position.x === this.fruit.position.x && this.snake.head.position.y === this.fruit.position.y) {
      this.fruit = new Fruit(this.getRandomFruitPosition());
      this.snake.grow(2);
      this.score += 3;
    }

    if (this.snake.isDead(this.width, this.height)) {
      this.gameOver = true;
      const bestScore = this.getHightScore();

      if (bestScore !== null) {
        if (bestScore > this.score) {
          return;
        }
      }

      this.setHightScore();
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

      case ' ':
        if(this.gameOver) {
          this.init();
        }
        break;
    }
  }

  draw(canvas) {
    if (this.gameOver) {
      canvas.text('Game Over', { size: 30, color: 'black', y: 80 });
      canvas.text(this.score, { size: 15, color: 'black', y: 120 })
      canvas.text(`Best score: ${this.getHightScore()}`, { size: 10, color: 'black', y: 150 })
      canvas.text('<press space to restart>', { size: 10, color: '#666', y: 190 });
    }

    canvas.text(this.score, { size: 10, color: '#666', x: 190, y: 12 })
    this.fruit.draw(canvas);
    this.snake.draw(canvas);
  }
}

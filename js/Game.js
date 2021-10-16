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
    this.isPaused = false;

    document.addEventListener('keydown', (e) => this.onKeyDown(e));
  }

  init() {
    this.snake = this.createSnake();
    this.fruit = new Fruit(this.getRandomFruitPosition());

    this.score = 0;
    this.gameOver = false;
    this.isPaused = false;
  }

  createSnake() {
    const snakeSize = 3;
    const snakePoint = getRandomPoint({
      x: [snakeSize, this.width - snakeSize],
      y: [snakeSize, this.height - snakeSize],
    });

    return new Snake(snakePoint, snakeSize);
  }

  getRandomFruitPosition() {
    const snakeCells = this.snake.getCells();
    const cells = [];

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        cells.push(new Point(x, y));
      }
    }

    const availableCells = cells.filter(
      (cell) => !snakeCells.find((snakeCell) => cell.eql(snakeCell))
    );

    return availableCells[rand(0, availableCells.length)];
  }

  getHightScore() {
    return localStorage.getItem('bestScore') || 0;
  }

  setHightScore(score) {
    const bestScore = this.getHightScore();

    if (bestScore !== null) {
      if (score > bestScore) {
        localStorage.setItem('bestScore', score);
      }
    }
  }

  update() {
    if (this.gameOver || this.isPaused) {
      return;
    }

    this.snake.move();
    this.score += 1;

    if (this.snake.head.position.eql(this.fruit.position)) {
      this.fruit = new Fruit(this.getRandomFruitPosition());
      this.snake.grow(2);
      this.score += 3;
    }

    if (this.snake.isDead(this.width, this.height)) {
      this.gameOver = true;

      this.setHightScore(this.score);
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
        if (this.gameOver) {
          this.init();
        }
        break;

      case 'p':
        if (!this.gameOver) {
          this.isPaused = !this.isPaused;
        }
        break;
    }
  }

  draw(canvas) {
    this.fruit.draw(canvas);
    this.snake.draw(canvas);

    if (this.gameOver) {
      canvas.text('Game Over', { size: 30, color: 'black', y: 80 });
      canvas.text(this.score, { size: 15, color: 'black', y: 120 });
      canvas.text(`Best score: ${this.getHightScore()}`, { size: 10, color: 'black', y: 150 });
      canvas.text('<press space to restart>', { size: 10, color: '#666', y: 190 });

      return;
    }

    canvas.text(this.score, { size: 10, color: '#666', x: 190, y: 12 });

    if (this.isPaused) {
      canvas.text('Game Paused', { size: 30, color: 'black', y: 80 });
      canvas.text('<press p to resume>', { size: 10, color: '#666', y: 190 });
    }
  }
}

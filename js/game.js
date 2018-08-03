class Game {

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.snake = null;
    this.fruit = null;
    this.score = null;
    this.gameOver = null;

    this.init();

    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  init() {
    const { width, height } = this;

    this.snake = new Snake(new Point(rand(3, width - 6), rand(3, height - 6)), 3);
    this.fruit = new Fruit(this.getRandomFruitPosition());
    this.score = 0;
    this.gameOver = false;
  }

  draw(canvas) {
    this.snake.draw(canvas);
    this.fruit.draw(canvas);

    if (this.gameOver) {
      canvas.text('Game Over', { size: 30, color: 'black', y: 80 });
      canvas.text('score: ' + this.score, { size: 15, color: 'black', y: 120 });
      canvas.text('(best: ' + this.getHighScore() + ')', { size: 12, color: 'black', y: 140 });
      canvas.text('<press space to restart>', { size: 10, color: '#666', y: 190 });
    } else {
      canvas.text('score: ' + this.score, { size: 10, color: '#666', x: 5, y: 12 });
    }
  }

  update() {
    if (this.gameOver)
      return;

    this.snake.move();

    const hp = this.snake.head.position;
    const fp = this.fruit.position;
    const { width, height } = this;

    if (hp.x === fp.x && hp.y === fp.y) {
      this.snake.grow(2);
      this.fruit = new Fruit(this.getRandomFruitPosition());
      this.score += 3;
    }

    if (this.snake.isDead(width, height)) {
      this.gameOver = true;
      this.setHighScore(this.score);
    }
    else
      this.score++;
  }

  getRandomFruitPosition() {
    const { width, height } = this;
    const snakeCells = this.snake.getCells();
    const cells = [];

    for (let i = 0; i < height; ++i) {
      for (let j = 0; j < width; ++j)
        cells.push(new Point(j, i));
    }

    const availableCells = cells.filter(c => !snakeCells.find(sc => sc.eql(c)));
    const randIdx = rand(0, availableCells.length);

    return availableCells[randIdx];
  }

  onKeyDown(e) {
    if (this.gameOver && e.key === ' ')
      return this.init();

    const dir = e.key.toLowerCase().slice('Arrow'.length);

    if (['left', 'right', 'up', 'down'].indexOf(dir) < 0)
      return;

    this.snake.go(dir);
  }

  setHighScore(score) {
    const highscore = this.getHighScore();

    if (score > highscore)
      localStorage.setItem('highscore', score);
  }

  getHighScore() {
    return localStorage.getItem('highscore') || 0;
  }

}

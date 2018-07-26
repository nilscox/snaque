class Game {

  constructor() {
    this.canvas = new Canvas(document.getElementById('canvas'));
    this.gameOver = false;

    this.init();
    this.redraw();

    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  init() {
    const { width, height } = this.canvas.getDimensions();

    this.snake = new Snake(new Point(rand(3, width - 6), rand(3, height - 6)), 3);
    this.fruit = new Fruit(this.randomFruitPosition());
  }

  onKeyDown(e) {
    if (this.gameOver) {
      this.gameOver = false;

      this.init();
      this.redraw();

      return;
    }

    const dir = e.key.toLowerCase().slice('Arrow'.length);

    if (['left', 'right', 'up', 'down'].indexOf(dir) < 0)
      return;

    this.snake.go(dir);
  }

  randomFruitPosition() {
    const { width, height } = this.canvas.getDimensions();
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

  redraw() {
    this.canvas.clear();

    this.snake.draw(this.canvas);
    this.fruit.draw(this.canvas);

    if (this.gameOver) {
      this.canvas.text('Game Over', 30, 'black', 80);
      this.canvas.text('<press any key to restart>', 10, '#666', 190);
    }
  }

  update() {
    if (this.gameOver)
      return;

    this.snake.move();

    const hp = this.snake.head.position;
    const fp = this.fruit.position;
    const { width, height } = this.canvas.getDimensions();

    if (hp.x === fp.x && hp.y === fp.y) {
      this.snake.grow(2);
      this.fruit = new Fruit(this.randomFruitPosition());
    }

    if (this.snake.isDead(width, height))
      this.gameOver = true;
  }

}

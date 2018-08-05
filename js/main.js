'use strict';

function start(canvas) {
  const game = new Game(canvas.canvas.width, canvas.canvas.height);

  game.init();
  game.draw(canvas);

  function frame() {
    canvas.clear();
    game.snake.nextDirection = ['left', 'right', 'up', 'down'][~~(Math.random() * 4)];
    game.update();
    game.draw(canvas);
  }

  setInterval(frame, 100);
}

const main = () => {
  const c = document.getElementById('canvas');
  const canvas = new Canvas(c); 

  start(canvas);
}

main();

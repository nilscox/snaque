'use strict';

function start(canvas) {
  const game = new Game(canvas.canvas.width, canvas.canvas.height);

  game.init();
  game.draw(canvas);

  function frame() {
    canvas.clear();
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

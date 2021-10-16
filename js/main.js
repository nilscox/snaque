'use strict';

function start(canvas) {
  const game = new Game(canvas.getGridDimensions().width, canvas.getGridDimensions().height);

  game.init();
  game.draw(canvas);

  function frame() {
    game.update();
    canvas.clear();
    game.draw(canvas);
  }

  setInterval(frame, 100);
}

const main = () => {
  const c = document.getElementById('canvas');
  const canvas = new Canvas(c);

  function handler() {
    document.removeEventListener('keypress', handler);
    start(canvas);
  }

  document.addEventListener('keypress', handler);

  canvas.text('SNAQUE', { size: 30, color: 'greenforest', y: 50 });
  canvas.text('<press any key to start>', { size: 10, color: '#666', y: 190 });
};

main();

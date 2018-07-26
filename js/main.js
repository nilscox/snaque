const start = () => {
  const game = new Game();

  requestAnimationFrame(function frame() {
    game.update();
    game.redraw();
    setTimeout(() => requestAnimationFrame(frame), 100);
  });
}

const main = () => {
  const canvas = new Canvas(document.getElementById('canvas'));

  canvas.text('SNAIQUE', 30, 'greenforest', 50);
  canvas.text('<press any key to start>', 10, '#666', 190);

  document.addEventListener('keydown', function listener() {
    document.removeEventListener('keydown', listener);
    start();
  });

};

main();

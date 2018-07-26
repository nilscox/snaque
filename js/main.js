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

  canvas.text('SNAIQUE', { size: 30, color: 'greenforest', y: 50 });
  canvas.text('<press any key to start>', { size: 10, color: '#666', y: 190 });

  document.addEventListener('keydown', function listener() {
    document.removeEventListener('keydown', listener);
    start();
  });

};

main();

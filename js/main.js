const start = (canvas) => {
  const { width, height } = canvas.getGridDimensions();
  const game = new Game(width, height);

  const frame = () => {
    game.update();
    canvas.clear();
    game.draw(canvas);
  };

  setInterval(frame, 300);
}

const main = () => {
  const canvas = new Canvas(document.getElementById('canvas'));

  canvas.text('SNAIQUE', { size: 30, color: 'greenforest', y: 50 });
  canvas.text('<press any key to start>', { size: 10, color: '#666', y: 190 });

  document.addEventListener('keydown', function listener() {
    document.removeEventListener('keydown', listener);
    start(canvas);
  });
};

main();
const main = () => {
  const game = new Game();

  requestAnimationFrame(function frame() {
    game.update();
    game.redraw();
    setTimeout(() => requestAnimationFrame(frame), 100);
  });
}

main();

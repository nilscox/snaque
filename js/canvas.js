class Canvas {

  static CELL_SIZE() {
    return 10;
  }

  constructor(domCanvas) {
    this.domCanvas = domCanvas;
    this.context = this.domCanvas.getContext('2d');
  }

  getGridDimensions() {
    const size = Canvas.CELL_SIZE();

    return {
      width: this.domCanvas.width / size,
      height: this.domCanvas.height / size,
    };
  }

  clear() {
    const { width, height } = this.domCanvas;

    this.context.clearRect(0, 0, width, height);
  }

  square(p, color) {
    const { context: ctx } = this;
    const size = Canvas.CELL_SIZE();

    ctx.fillStyle = color;
    ctx.fillRect(p.x * size, p.y * size, size, size);
  }

  text(text, { size, color, x, y }) {
    const { context: ctx } = this;
    const { width: cw, height: ch } = this.domCanvas;

    ctx.font = size + 'px monospace';
    ctx.fillStyle = color;

    if (x)
      ctx.fillText(text, x, y);
    else {
      const { width } = ctx.measureText(text);
      ctx.fillText(text, (cw - width) / 2, y);
    }
  }

}

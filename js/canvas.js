class Canvas {

  constructor(domCanvas) {
    this.domCanvas = domCanvas;
    this.context = this.domCanvas.getContext('2d');

    this.context.font = '30px monospace';
  }

  getDimensions() {
    const size = Rectangle.SIZE();

    return {
      width: this.domCanvas.width / size,
      height: this.domCanvas.height / size,
    };
  }

  clear() {
    const { width, height } = this.domCanvas;

    this.context.clearRect(0, 0, width, height);
  }

  rect(p, size, color) {
    const { context: ctx } = this;

    ctx.fillStyle = color;
    ctx.fillRect(p.x * size, p.y * size, size, size);
  }

  text(text, color) {
    const { context: ctx } = this;
    const { width: cw, height: ch } = this.domCanvas;
    const { width } = ctx.measureText(text);

    ctx.fillStyle = color;
    ctx.fillText(text, (cw - width) / 2, ch / 2);
  }

}

class Canvas {

  constructor(domCanvas) {
    this.domCanvas = domCanvas;
    this.context = this.domCanvas.getContext('2d');
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

}

'use strict';

class Canvas {
  constructor(domCanvas) {
    this.canvas= domCanvas;
    this.ctx = this.canvas.getContext('2d'); 
  }

  static CELLS_SIZE() {
    return 10;
  }

  getGridDimensions() {
    return {width: this.canvas.width, height: this.canvas.height};
  }

  square(p, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(p.x * Canvas.CELLS_SIZE(), p.y * Canvas.CELLS_SIZE(), Canvas.CELLS_SIZE(), Canvas.CELLS_SIZE());
  }

  text(p, opts) {
    opts.x = x || (this.canvas.width / 2) - this.ctx.mesureText(opts.size).width;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}


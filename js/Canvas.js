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
    return {width: this.canvas.width / Canvas.CELLS_SIZE(), height: this.canvas.height / Canvas.CELLS_SIZE()};
  }

  square(p, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(p.x * Canvas.CELLS_SIZE(), p.y * Canvas.CELLS_SIZE(), Canvas.CELLS_SIZE(), Canvas.CELLS_SIZE());
  }

  text(text, opts) {
    opts.x = opts.x || (this.canvas.width / 2) - this.ctx.mesureText(opts.size).width;

    this.ctx.font = opts.size;
    this.ctx.fillStyle = opts.color;
    this.ctx.fillText(text, opts.x, opts.y);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
  }

}


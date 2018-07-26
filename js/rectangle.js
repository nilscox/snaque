class Rectangle extends Drawable {

  static SIZE() {
    return 10;
  }

  constructor(position, color) {
    super();

    this.position = position;
    this.color = color;
  }

  draw(canvas) {
    canvas.rect(this.position, Rectangle.SIZE(), this.color);
  }

}

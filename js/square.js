class Square extends Drawable {

  constructor(position, color) {
    super();

    this.position = position;
    this.color = color;
  }

  draw(canvas) {
    canvas.square(this.position, this.color);
  }

}

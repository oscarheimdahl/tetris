class Grid {
  constructor(width, height) {
    this.pixels = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        this.pixels.push(new Pixel(i, j));
      }
    }
  }

  draw() {
    this.pixels.forEach(pixel => {
      if (pixel.color === g_color) noStroke();
      else {
        stroke(g_color);
        strokeWeight(2);
      }
      fill(pixel.color);
      rect(
        pixel.x * pixelSize + border,
        pixel.y * pixelSize + border,
        pixelSize,
        pixelSize,
        2
      );
    });
  }

  reset() {
    this.pixels.forEach(pixel => {
      pixel.color = g_color;
    });
  }

  setPixel(x, y, color) {
    this.pixels.forEach(pixel => {
      if (pixel.x == x && pixel.y == y) pixel.color = color;
    });
  }
}

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
			if (pixel.color === 'white') noStroke();
			else stroke(255);
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
			pixel.color = 'white';
		});
	}

	setPixel(x, y, color) {
		this.pixels.forEach(pixel => {
			if (pixel.x == x && pixel.y == y) pixel.color = color;
		});
	}
}

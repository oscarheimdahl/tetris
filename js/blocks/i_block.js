class I_Block extends Block {
	constructor() {
		super();
		this.color = i_color;
		this.orientation = randomInt(4);
		this.setPixels();
	}

	setPixels() {
		this.pixels = [];
		switch (this.orientation) {
			case 0: {
				this.pixels.push(
					new Pixel(this.centerPixel.x, this.centerPixel.y, this.color)
				);
				this.pixels.push(
					new Pixel(this.centerPixel.x, this.centerPixel.y + 1, this.color)
				);
				this.pixels.push(
					new Pixel(this.centerPixel.x, this.centerPixel.y + 2, this.color)
				);
				this.pixels.push(
					new Pixel(this.centerPixel.x, this.centerPixel.y - 1, this.color)
				);
				break;
			}
			case 1: {
				this.pixels.push(
					new Pixel(this.centerPixel.x, this.centerPixel.y, this.color)
				);
				this.pixels.push(
					new Pixel(this.centerPixel.x - 1, this.centerPixel.y, this.color)
				);
				this.pixels.push(
					new Pixel(this.centerPixel.x - 2, this.centerPixel.y, this.color)
				);
				this.pixels.push(
					new Pixel(this.centerPixel.x + 1, this.centerPixel.y, this.color)
				);
				break;
			}
			case 2: {
				this.pixels.push(
					new Pixel(this.centerPixel.x, this.centerPixel.y, this.color)
				);
				this.pixels.push(
					new Pixel(this.centerPixel.x, this.centerPixel.y + 1, this.color)
				);
				this.pixels.push(
					new Pixel(this.centerPixel.x, this.centerPixel.y + 2, this.color)
				);
				this.pixels.push(
					new Pixel(this.centerPixel.x, this.centerPixel.y - 1, this.color)
				);
				break;
			}
			case 3: {
				this.pixels.push(
					new Pixel(this.centerPixel.x, this.centerPixel.y, this.color)
				);
				this.pixels.push(
					new Pixel(this.centerPixel.x - 1, this.centerPixel.y, this.color)
				);
				this.pixels.push(
					new Pixel(this.centerPixel.x + 1, this.centerPixel.y, this.color)
				);
				this.pixels.push(
					new Pixel(this.centerPixel.x + 2, this.centerPixel.y, this.color)
				);
				break;
			}
		}
	}
}

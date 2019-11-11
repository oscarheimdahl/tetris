class O_Block extends Block {
	constructor() {
		super();
		this.color = o_color;
		this.orientation = randomInt(4);
		this.setPixels();
	}

	rotate() {}

	setPixels() {
		this.pixels = [];

		this.pixels.push(
			new Pixel(this.centerPixel.x, this.centerPixel.y, this.color)
		);
		this.pixels.push(
			new Pixel(this.centerPixel.x + 1, this.centerPixel.y, this.color)
		);
		this.pixels.push(
			new Pixel(this.centerPixel.x, this.centerPixel.y + 1, this.color)
		);
		this.pixels.push(
			new Pixel(this.centerPixel.x + 1, this.centerPixel.y + 1, this.color)
		);
	}
}

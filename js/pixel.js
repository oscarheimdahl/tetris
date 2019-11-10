class Pixel {
	constructor(x, y, color, center) {
		if (!color) color = 'white;';
		this.x = x;
		this.y = y;
		this.color = color;
		this.center = center;
	}
}

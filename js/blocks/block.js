class Block {
	constructor() {
		this.centerPixel = new Pixel(5, 0);
		this.landed = false;
	}

	descend() {
		this.landed = this.onTopOfOldPixels() || this.onTopOfBottom();
		if (!this.landed) {
			this.pixels.forEach(pixel => {
				pixel.y++;
			});
			this.centerPixel.y++;
		}
	}

	onTopOfBottom() {
		let landed = false;
		this.pixels.forEach(pixel => {
			landed = pixel.y == gridHeight - 1 || landed;
		});
		return landed;
	}

	onTopOfOldPixels() {
		let landed = false;
		oldPixels.forEach(oldPixel => {
			this.pixels.forEach(pixel => {
				landed = (pixel.y == oldPixel.y - 1 && pixel.x == oldPixel.x) || landed;
			});
		});
		return landed;
	}

	nextToRightEdge() {
		let nextTo = false;
		this.pixels.forEach(pixel => {
			if (pixel.x >= gridWidth - 1) {
				nextTo = true;
			}
		});
		return nextTo;
	}

	nextToLeftEdge() {
		let nextTo = false;
		this.pixels.forEach(pixel => {
			if (pixel.x <= 0) {
				nextTo = true;
			}
		});
		return nextTo;
	}

	overRightEdge() {
		let over = false;
		this.pixels.forEach(pixel => {
			if (pixel.x > gridWidth - 1) {
				over = true;
			}
		});
		return over;
	}

	overLeftEdge() {
		let over = false;
		this.pixels.forEach(pixel => {
			if (pixel.x < 0) {
				over = true;
			}
		});
		return over;
	}

	overBottomEdge() {
		let over = false;
		this.pixels.forEach(pixel => {
			if (pixel.y > gridHeight - 1) {
				over = true;
			}
		});
		return over;
	}

	moveRight() {
		//checks if move results in outside screen.
		if (this.nextToRightEdge() == true) return;

		let newPixels = [];
		this.pixels.forEach(pixel => {
			newPixels.push(new Pixel(pixel.x + 1, pixel.y, pixel.color));
		});

		if (!this.oldPixelOverlap(newPixels)) {
			this.pixels = newPixels;
			this.centerPixel.x++;
		}
	}

	moveLeft() {
		//checks if move results in outside screen.
		if (this.nextToLeftEdge() == true) return;

		//creates new potential pixels
		let newPixels = [];
		this.pixels.forEach(pixel => {
			newPixels.push(new Pixel(pixel.x - 1, pixel.y, pixel.color));
		});
		//sets new pixels if they dont overlap with old.
		if (!this.oldPixelOverlap(newPixels)) {
			this.pixels = newPixels;
			this.centerPixel.x--;
		}
	}

	oldPixelOverlap(pixels) {
		let overLap = false;
		oldPixels.forEach(oldPixel => {
			pixels.forEach(pixel => {
				overLap = (pixel.x == oldPixel.x && pixel.y == oldPixel.y) || overLap;
			});
		});
		return overLap;
	}

	rotate() {
		let oldOrientation = this.orientation;
		this.orientation = (this.orientation + 1) % 4;
		this.setPixels();
		if (
			this.oldPixelOverlap(this.pixels) ||
			this.overRightEdge() ||
			this.overLeftEdge() ||
			this.overBottomEdge()
		) {
			this.orientation = oldOrientation;
			this.setPixels();
		}
	}
}

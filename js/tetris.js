const gridWidth = 12;
const gridHeight = 20;
const pixelSize = 35;
const difficulty = 25;

let grid = new Grid(gridWidth, gridHeight);
let activeBlock;
let oldPixels = [];
let ghost = [];

function setup() {
	noStroke();
	setBlock();
	createCanvas(gridWidth * pixelSize, gridHeight * pixelSize);
	background(0);
	// frameRate(10);
	activeBlock.rotate();
}

function draw() {
	grid.reset();
	if (frameCount % difficulty == 0) {
		activeBlock.descend();
		if (activeBlock.landed) newActiveBlock();
	}
	setGhost();
	pixelsToGrid(ghost);
	pixelsToGrid(activeBlock.pixels);
	pixelsToGrid(oldPixels);
	grid.draw();
}

function setGhost() {
	ghost = [];
	let maxYPixel = new Pixel(0, 0);
	activeBlock.pixels.forEach(pixel => {
		ghost.push(new Pixel(pixel.x, pixel.y, 'grey'));
		if (pixel.y > maxYPixel.y) maxYPixel = pixel;
	});
	let distanceToBottom = getDistanceToOldBlocks(maxYPixel);
	// console.log(distanceToBottom);
	ghost.forEach(pixel => {
		pixel.y += distanceToBottom;
	});
}

function getDistanceToOldBlocks(maxYPixel) {
	let distanceToBottom = gridHeight - maxYPixel.y;
	oldPixels.forEach(oldPixel => {
		activeBlock.pixels.forEach(pixel => {
			if (pixel.x == oldPixel.x && distanceToBottom > oldPixel.y - pixel.y)
				distanceToBottom = oldPixel.y - pixel.y;
		});
	});
	return distanceToBottom - 1;
}

function checkFullRow() {
	let rows = [];
	oldPixels.forEach(pixel => {
		if (!rows[pixel.y]) rows[pixel.y] = 0;
		rows[pixel.y]++;
	});
	if (rows.length > 0) deleteFullRows(rows);
}

function deleteFullRows(rows) {
	let rowsDeleted = [];
	rows.forEach((pixelsInRow, index) => {
		if (pixelsInRow == gridWidth) {
			rowsDeleted.push(index);
			oldPixels = oldPixels.filter(pixel => {
				return pixel.y != index;
			});
		}
	});
	setTimeout(() => lowerRowsAboveDelete(rowsDeleted), 300);
}

function lowerRowsAboveDelete(rowsDeleted) {
	oldPixels.forEach(pixel => {
		let deletedRowsBelow = 0;
		rowsDeleted.forEach(row => {
			if (pixel.y < row) deletedRowsBelow++;
		});
		pixel.y = pixel.y + deletedRowsBelow;
	});
}

function newActiveBlock() {
	activeBlockToOldPixels();
	checkFullRow();
	setBlock();
}

function setBlock() {
	switch (randomInt(7)) {
		case 0: {
			activeBlock = new Z_Block();
			break;
		}
		case 1: {
			activeBlock = new S_Block();
			break;
		}
		case 2: {
			activeBlock = new L_Block();
			break;
		}
		case 3: {
			activeBlock = new J_Block();
			break;
		}
		case 4: {
			activeBlock = new T_Block();
			break;
		}
		case 5: {
			activeBlock = new O_Block();
			break;
		}
		case 6: {
			activeBlock = new I_Block();
			break;
		}
	}
}

function activeBlockToOldPixels() {
	activeBlock.pixels.forEach(pixel => {
		oldPixels.push(pixel);
	});
}

function pixelsToGrid(pixels) {
	pixels.forEach(pixel => {
		grid.setPixel(pixel.x, pixel.y, pixel.color);
	});
}

function keyPressed(keycode) {
	if (keycode.code === 'ArrowRight') activeBlock.moveRight();
	if (keycode.code === 'ArrowLeft') activeBlock.moveLeft();
	if (keycode.code === 'ArrowDown') activeBlock.descend();
	if (keycode.code === 'ArrowUp') activeBlock.rotate();
	if (keycode.code === 'Space') {
		while (!activeBlock.landed) {
			activeBlock.descend();
		}
		newActiveBlock();
	}
}

function randomInt(max) {
	return Math.floor(Math.random() * max);
}

const gridWidth = 12;
const gridHeight = 20;
const border = 2;
const difficulty = 30;
//35
let pixelSize;

let g_color = 'white';
let i_color = 'rgb(235,25,40)';
let j_color = 'rgb(235,129,0)';
let l_color = 'rgb(255,214,0)';
let o_color = 'rgb(56,197,80)';
let s_color = 'rgb(70,180,230)';
let z_color = 'rgb(0,102,230)';
let t_color = 'rgb(255,0,120)';

let gameOver = false;
let grid = new Grid(gridWidth, gridHeight);
let activeBlock;
let oldPixels = [];
let ghost = [];
let canvas;
let pause = false;
let score;

function setup() {
  document.getElementById('newGame').onclick = () => newGame();
  score = document.getElementById('score');
  setPixelSize();
  setBlock();
  if (!canvas) {
    canvas = createCanvas(
      gridWidth * pixelSize + border * 2 + 1,
      gridHeight * pixelSize + border * 2 + 1
    );
    canvas.parent('canvasContainer');
  }
}

function draw() {
  background(g_color);
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
    ghost.push(new Pixel(pixel.x, pixel.y, 'rgb(230,230,230)'));
    if (pixel.y > maxYPixel.y) maxYPixel = pixel;
  });
  let distanceToBottom = getDistanceToOldBlocks(maxYPixel);
  // console.log(distanceToBottom);
  if (distanceToBottom > 0)
    ghost.forEach(pixel => {
      pixel.y += distanceToBottom;
    });
}

function newGame() {
  gameOver = false;
  ghost = [];
  oldPixels = [];
  setup();
  loop();
  document.getElementById('newGame').style = 'display: none;';
  score.innerHTML = 0;
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
  deleteFullRows(rows);
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
  score.innerHTML =
    parseInt(score.innerHTML) + rowsDeleted.length * 100 * rowsDeleted.length;
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
  if (gameOver) return;

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
    if (pixel.y == 0) setGameOver();
  });
}

function setGameOver() {
  document.getElementById('newGame').style = 'display: block;';
  gameOver = true;
  noLoop();
}

function pixelsToGrid(pixels) {
  pixels.forEach(pixel => {
    grid.setPixel(pixel.x, pixel.y, pixel.color);
  });
}

function keyReleased(code) {
  allowInput = true;
}

function keyPressed(keycode) {
  if (keycode.code === 'Enter') {
    if (gameOver) newGame();
    else if (!pause) {
      pause = true;
      noLoop();
    } else {
      pause = false;
      loop();
    }
  }

  if (!gameOver && !pause) {
    if (keycode.code === 'ArrowRight') activeBlock.moveRight();
    if (keycode.code === 'ArrowLeft') activeBlock.moveLeft();
    if (keycode.code === 'ArrowUp') activeBlock.rotate();
    if (keycode.code === 'ArrowDown') {
      activeBlock.descend();
      if (activeBlock.landed) newActiveBlock();
    }
    if (keycode.code === 'Space') {
      while (!activeBlock.landed) {
        activeBlock.descend();
      }
      newActiveBlock();
    }
  }
}

function setPixelSize() {
  pixelSize =
    Math.max(
      (document.documentElement.clientHeight, window.innerHeight || 0) * 0.9
    ) / gridHeight;
}

function windowResized() {
  setPixelSize();
  resizeCanvas(gridWidth * pixelSize, gridHeight * pixelSize);
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

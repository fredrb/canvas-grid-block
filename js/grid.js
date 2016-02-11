var Block = function(x, y) {
  this.x = x;
  this.y = y;
  this.LENGTH = 100;
  this.WIDTH  = 100;
};

var Grid = function() {
  this.canvas = document.getElementById("grid");
  this._initailizeGrid();
}

function getMousePosition(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
};

Grid.prototype._initailizeGrid = function() {
  this.unfilled = [];
  this.filled = [];
  for(var row = 0; row < 4; row++) {
    for(var column = 0; column < 4; column++) {
      var block = new Block(row*100, column*100)
      this.unfilled.push(block);
    }
  }

  this.canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePosition(this, evt);
    var block = grid.popFilledFrom(mousePos.x, mousePos.y);
    if (block != null) {
      var context = this.getContext("2d");
      context.clearRect(block.x, block.y, block.LENGTH, block.WIDTH);
      grid.unfilled.push(block);
    }
  }, false);
}

Grid.prototype.popFilledFrom = function (clickedX, clickedY) {
  var x = this.getPrettyCoordinates(clickedX);
  var y = this.getPrettyCoordinates(clickedY);
  for(var block in this.filled) {
    if (this.filled[block].x == x && this.filled[block].y == y) return new Block(x, y);
  }

  return null;
};

Grid.prototype.getPrettyCoordinates = function (num) {
  return Math.floor(num/100)*100;
};

Grid.prototype.popRandomUnfilledBlock = function() {
  if (this.unfilled.length == 0)
    throw new Error("No unfilled blocks to pop");
  var index = Math.floor(Math.random()*this.unfilled.length);
  var blockRef = this.unfilled[index];
  var block = new Block(blockRef.x, blockRef.y);
  this.unfilled.splice(index, 1);
  return block;
}

Grid.prototype.popRandomFilledBlock = function() {
  if (this.filled.length == 0)
    throw new Error("No filled blocks to pop");
  var index = Math.floor(Math.random()*this.filled.length);
  var blockRef = this.filled[index];
  var block = new Block(blockRef.x, blockRef.y);
  this.filled.splice(index, 1);
  return block;
}

Grid.prototype.eraseRandomBlock = function() {
  var context = this.canvas.getContext("2d");
  var block = this.popRandomFilledBlock();

  context.clearRect(block.x, block.y, block.LENGTH, block.WIDTH);

  this.unfilled.push(block);
}

Grid.prototype.drawRandomBlock = function () {
  var context = this.canvas.getContext("2d");
  context.fillStyle = "#8891d2";

  var block = this.popRandomUnfilledBlock();

  context.fillRect(block.x, block.y, block.LENGTH, block.WIDTH);

  this.filled.push(block);
};

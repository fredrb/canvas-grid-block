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

Grid.prototype._initailizeGrid = function() {
  this.unfilled = [];
  this.filled = [];
  for(var row = 0; row < 4; row++) {
    for(var column = 0; column < 4; column++) {
      var block = new Block(row*100, column*100)
      this.unfilled.push(block);
    }
  }
}

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

var CELL_LENGTH = 100;
var CELL_WIDTH = 100;

var Block = function() {}

var Cell = function(x, y) {
  this.x = x;
  this.y = y;
  this.content = null;
}

var Grid = function(mapLength, mapHeight) {
  this.canvas = new CanvasControll(this);
  this.erased = 0;
  this._initailizeGrid(mapLength, mapHeight);
}

Grid.prototype._initailizeGrid = function(mapLength, mapHeight) {
  this.unfilledCells = [ ];
  this.filledCells   = [ ];
  this.map           = [ ];
  for (var row = 0; row < mapLength; row++) {
    this.map.push([]);
    for (var column = 0; column < mapHeight; column++) {
      var cell = new Cell(row, column);
      this.map[row].push(cell);
      this.unfilledCells.push(cell);
    }
  }

  this.canvas.attachClickListener(this.onCanvasClick);
};

Grid.prototype.drawCellAt = function (x, y) {
  var selectedCell = this.map[x][y];
  if (selectedCell.content != null) {
    throw new Error("Cell " + [x,y] + " not empty");
  }

  this.unfilledCells.splice(this.unfilledCells.indexOf(selectedCell), 1);
  selectedCell.content = new Block();
  this.filledCells.push(selectedCell);

  this.canvas.drawCellAtPosition(x*100, y*100, CELL_LENGTH, CELL_WIDTH);
};

Grid.prototype.eraseUglyCoordinatesCellAt = function (x, y) {
  var prettyX = Math.floor(x/100);
  var prettyY = Math.floor(y/100);

  this.eraseCellAt(prettyX, prettyY);
};

Grid.prototype.eraseCellAt = function (x, y) {
  var selectedCell = this.map[x][y];
  if (selectedCell.content == null) {
    throw new Error("Cell already empty");
  }

  this.filledCells.splice(this.filledCells.indexOf(selectedCell), 1);
  selectedCell.content = null
  this.unfilledCells.push(selectedCell);

  this.canvas.eraseCellAtPosition(x*100, y*100, CELL_LENGTH, CELL_WIDTH);
};

Grid.prototype._getRandomUnfilledCell = function () {
  var index = Math.floor(Math.random()*this.unfilledCells.length);
  return this.unfilledCells[index];
};

Grid.prototype._getRandomFilledCell = function () {
  var index = Math.floor(Math.random()*this.filledCells.length);
  return this.filledCells[index];
};

Grid.prototype.onCanvasClick = function(event) {
  var mousePos = getMousePosition(this, event);
  var success = true;

  try {
    grid.eraseUglyCoordinatesCellAt(mousePos.x, mousePos.y);
  } catch(e) {
    success = false;
  }

  if (success) this.erased += 1;

}

function getMousePosition(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
};

Grid.prototype.initAutoDraw = function (timer) {
  var self = this;
  if (this.unfilledCells.length > 0) {
    var randomCell = this._getRandomUnfilledCell();
    this.drawCellAt(randomCell.x, randomCell.y);
  }

  setTimeout(function() {
    self.initAutoDraw(timer);
  }, timer);
};

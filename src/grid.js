// var Block = function() {}

var Cell = function(x, y) {
  this.x = x;
  this.y = y;
  this.content = null;
}

var Grid = function(id, gridConfig) {
  this.canvas = new CanvasControll(id, this);
  this.CELL_WIDTH = gridConfig.cellWidth;
  this.CELL_HEIGHT = gridConfig.cellHeight;
  this._initailizeGrid(gridConfig.mapWidth, gridConfig.mapHeight, gridConfig.cellBorder);
}

Grid.prototype._initailizeGrid = function(mapLength, mapHeight, cellBorder) {
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
  if (cellBorder) {
    this.canvas.drawGridBorders(cellBorder);
    this.canvas.drawGridLines(mapLength, mapHeight, this.CELL_WIDTH, this.CELL_HEIGHT, cellBorder);
  }
};

Grid.prototype.drawCellAt = function (x, y, content) {
  var obj = new content();
  var selectedCell = this.map[x][y];
  if (selectedCell.content != null) {
    throw new Error("Cell " + [x,y] + " not empty");
  }

  this.unfilledCells.splice(this.unfilledCells.indexOf(selectedCell), 1);
  selectedCell.content = obj;
  this.filledCells.push(selectedCell);

  this.canvas.drawCellAtPosition(x*this.CELL_WIDTH, y*this.CELL_HEIGHT, this.CELL_WIDTH, this.CELL_HEIGHT, obj);
};

Grid.prototype.eraseUglyCoordinatesCellAt = function (x, y) {
  var prettyX = Math.floor(x/this.CELL_WIDTH);
  var prettyY = Math.floor(y/this.CELL_HEIGHT);

  this.eraseCellAt(prettyX, prettyY);
};

Grid.prototype.eraseCellAt = function (x, y) {
  var selectedCell = this.map[x][y];
  if (selectedCell.content == null) {
    throw new Error("Cell already empty");
  }

  this.filledCells.splice(this.filledCells.indexOf(selectedCell), 1);
  selectedCell.content.destroy();
  selectedCell.content = null
  this.unfilledCells.push(selectedCell);

  this.canvas.eraseCellAtPosition(x*this.CELL_WIDTH, y*this.CELL_HEIGHT, this.CELL_WIDTH, this.CELL_HEIGHT);

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
    if (e.message == "Cell already empty")
      success = false;
    else
      throw e;
  }

  if (success) this.erased += 1;

}

Grid.prototype.eraseRandomCell = function () {
  var randomCell = this._getRandomFilledCell();
  this.eraseCellAt(randomCell.x, randomCell.y);
};

Grid.prototype.drawRandomCell = function(block) {
  var randomCell = this._getRandomUnfilledCell();
  this.drawCellAt(randomCell.x, randomCell.y, block);
}

Grid.prototype.initAutoDraw = function (timer, contentList) {
  var self = this;
  setTimeout(function() {
    if (self.unfilledCells.length > 0) {
      var randomContent = contentList[Math.floor(Math.random()*contentList.length)];
      var randomCell = self._getRandomUnfilledCell();
      self.drawCellAt(randomCell.x, randomCell.y, randomContent);
    }

    self.initAutoDraw(timer, contentList);
  }, timer);
};

function getMousePosition(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
};

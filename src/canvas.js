var CanvasControll = function(id, grid) {
  this.grid = grid;
  this.canvas = document.getElementById(id);
  this.context = this.canvas.getContext("2d");
}

CanvasControll.prototype.drawGridLines = function(mapWidth, mapHeight, cellSizeWidth, cellSizeHeight, config) {
  for (var column = 0; column < this.canvas.clientWidth; column += cellSizeWidth) {
    this.context.beginPath();
    this.context.lineWidth = config.size;
    this.context.strokeStyle = config.color;
    this.context.moveTo(column, 0);
    this.context.lineTo(column, this.canvas.clientHeight);
    this.context.stroke();
  }

  for(var row = 0; row < this.canvas.clientHeight; row += cellSizeHeight) {
    this.context.beginPath();
    this.context.lineWidth = config.size;
    this.context.strokeStyle = config.color;
    this.context.moveTo(0, row);
    this.context.lineTo(this.canvas.clientWidth, row);
    this.context.stroke();
  }
}

CanvasControll.prototype.drawGridBorders = function(config) {
  this.context.beginPath();
  this.context.lineWidth = config.size;
  this.context.strokeStyle = config.color;
  this.context.rect(0, 0, this.context.canvas.clientWidth, this.context.canvas.clientHeight);
  this.context.stroke();
}

CanvasControll.prototype.drawCellAtPosition = function (x, y, sizeX, sizeZ, content) {
  var context = this.canvas.getContext("2d");

  context.fillStyle = content.color;

  context.fillRect(x, y, sizeX, sizeZ);
};

CanvasControll.prototype.eraseCellAtPosition = function (x, y, sizeX, sizeZ) {
  var context = this.canvas.getContext("2d");

  context.clearRect(x, y, sizeX, sizeZ);
};

CanvasControll.prototype.attachClickListener = function(action) {
  this.canvas.addEventListener('click', action);
}

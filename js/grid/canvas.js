var CanvasControll = function(grid) {
  this.grid = grid;
  this.canvas = document.getElementById("grid");
}

CanvasControll.prototype.drawCellAtPosition = function (x, y, sizeX, sizeZ) {
  var context = this.canvas.getContext("2d");

  // TODO: This should be set by Block content
  context.fillStyle = "#8891d2";

  context.fillRect(x, y, sizeX, sizeZ);
};

CanvasControll.prototype.eraseCellAtPosition = function (x, y, sizeX, sizeZ) {
  var context = this.canvas.getContext("2d");

  context.clearRect(x, y, sizeX, sizeZ);
};

CanvasControll.prototype.attachClickListener = function(action) {
  this.canvas.addEventListener('click', action);
}

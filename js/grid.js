var Grid = function() {
  this.canvas = document.getElementById("grid");
  this.map = [ [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0] ];
}

Grid.prototype.find_free_block = function () {
  var block = null;
  var x = Math.floor(Math.random()*4);
  var y = Math.floor(Math.random()*4);

  while(this.map[x][y] != 0) {
    x = Math.floor(Math.random()*4);
    y = Math.floor(Math.random()*4);
  }

  return [x*100,y*100];
};

Grid.prototype.draw_block = function () {
  var context = this.canvas.getContext("2d");
  context.fillStyle = "#8891d2";
  var coordinates = this.find_free_block();
  context.fillRect(coordinates[0], coordinates[1], 100, 100);
};

var grid = new Grid();
grid.draw_block();
grid.draw_block();
grid.draw_block();
grid.draw_block();

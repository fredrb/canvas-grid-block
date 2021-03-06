describe('Grid test', function() {

  context('draw cells', function() {
    var defaultContent = function() {
      this.color = "#000",
      this.destroy = function(){}
    }

    var gridCanvas;
    var mockCanvas;
    var context;
    var grid;

    beforeEach(function() {
      var canvasElement = document.createElement('canvas');
      canvasElement.id = 'grid';
      canvasElement.width = 100;
      canvasElement.height = 100;
      document.body.appendChild(canvasElement);

      var mockCanvasElement = document.createElement('canvas');
      mockCanvasElement.id = 'mockCanvas';
      mockCanvasElement.width = 100;
      mockCanvasElement.height = 100;
      document.body.appendChild(mockCanvasElement);

      gridCanvas = document.getElementById('grid');
      mockCanvas = document.getElementById('mockCanvas');

      grid = new Grid('grid', {
        cellWidth : 50,
        cellHeight : 50,
        mapWidth : 2,
        mapHeight : 2
      });

      context = mockCanvas.getContext("2d");

    });

    afterEach(function() {
      document.body.removeChild(document.querySelector('#grid'));
      document.body.removeChild(document.querySelector('#mockCanvas'));
    });

    it('should draw cell at coordinate 0,0', function() {
      grid.drawCellAt(0, 0, defaultContent);

      context.fillStyle = "#000";
      context.fillRect(0, 0, 50, 50);
      expect(imagediff.equal(gridCanvas, mockCanvas)).to.eql(true);
    });

    it('should draw cell at coordinate 1,0', function() {
      grid.drawCellAt(1, 0, defaultContent);

      var context = mockCanvas.getContext("2d");
      context.fillStyle = "#000";
      context.fillRect(50, 0, 100, 50);

      expect(imagediff.equal(gridCanvas, mockCanvas)).to.eql(true);
    });

    it('should draw cell at coordinate 0,1', function() {
      grid.drawCellAt(0, 1, defaultContent);

      var context = mockCanvas.getContext("2d");
      context.fillStyle = "#000";
      context.fillRect(0, 50, 50, 100);

      expect(imagediff.equal(gridCanvas, mockCanvas)).to.eql(true);
    });

    it('should draw cell at coordinate 0,1', function() {
      grid.drawCellAt(1, 1, defaultContent);

      var context = mockCanvas.getContext("2d");
      context.fillStyle = "#000";
      context.fillRect(50, 50, 100, 100);

      expect(imagediff.equal(gridCanvas, mockCanvas)).to.eql(true);
    });

    it('should draw 4 random cells', function() {
      grid.drawRandomCell(defaultContent);
      grid.drawRandomCell(defaultContent);
      grid.drawRandomCell(defaultContent);
      grid.drawRandomCell(defaultContent);

      var context = mockCanvas.getContext("2d");
      context.fillStyle = "#000";
      context.fillRect(0, 0, 100, 100);

      expect(imagediff.equal(gridCanvas, mockCanvas)).to.eql(true);
    });

    it('should initialize auto draw', function() {
      grid.initAutoDraw(1, [defaultContent()]);

      var context = mockCanvas.getContext("2d");
      context.fillStyle = "#000";
      context.fillRect(0, 0, 100, 100);

      setTimeout(function() {
        expect(imagediff.equal(gridCanvas, mockCanvas)).to.eql(true);
        done();
      }, 10);

    })

  });

})

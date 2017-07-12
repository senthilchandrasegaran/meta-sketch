(function(){
  paper.install(window);
  window.onload = function() {
    paper.setup('mainCanvas');
    // Create a simple drawing tool:
    var tool = new Tool();
    var path;

    // Define a mousedown and mousedrag handler
    tool.onMouseDown = function(event) {
      path = new Path();
      path.strokeColor = '#333';
      path.add(event.point);
    }

    tool.onMouseDrag = function(event) {
      path.add(event.point);
    }

    tool.onMouseUp = function(event){
      path.simplify(10);
    }
  }
}());

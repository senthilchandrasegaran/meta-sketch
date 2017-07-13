(function(){
  paper.install(window);
  window.onload = function() {
    
    var pencilActive = false;
    var eraserActive = false;

    $('#pencil').on('click', function(){

      if (pencilActive) {
        $(this).removeClass('pencil-activated');
        pencilActive = false;
      } else {
        $(this).addClass('pencil-activated');
        pencilActive = true;
        // deactivate eraser if it is active
        if (eraserActive){
          eraserActive = false;
          $('#eraser').removeClass('eraser-activated');
        }
      }
    });

    $('#eraser').on('click', function(){
      if (eraserActive) {
        $(this).removeClass('eraser-activated');
        eraserActive = false;
      } else {
        $(this).addClass('eraser-activated');
        eraserActive = true;
        // deactivate pencil if it is active
        if (pencilActive){
          pencilActive = false;
          $('#pencil').removeClass('pencil-activated');
        }
      }
    });

    $('#clearAll').on('click', function(){
      var warnStr = "WARNING: Current canvas will be cleared. Proceed?";
      $(this).addClass('clearAll-activated');
      if (confirm(warnStr) === true) {
        paper.project.activeLayer.removeChildren();
        paper.view.draw();
      }
      $(this).removeClass('clearAll-activated');
    });


    paper.setup('mainCanvas');
    // Create a simple drawing tool:
    var tool = new Tool();
    var path;
    var point;
    var canvas = document.getElementById("mainCanvas");
    var context = canvas.getContext('2d');
    var offset = getOffset(canvas);
    var pencilDown = false;


    // Define a mousedown and mousedrag handler
    // tool.onMouseDown = function(event) {
    $('#mainCanvas').on('pointerdown', function(event){
      pencilDown = true;
      // draw stuff only if the pencil button is active
      if (pencilActive){
        
        if (path) {
          path.selected = false;
        }

        console.log("pointermove!");
        path = new Path();
        path.strokeColor = '#333';
        point = new Point();
        point.x = event.clientX - offset.left;
        point.y = event.clientY - offset.top;
        console.log(point);
        path.add(point);
      }
    // } //for tool.onMouseDown
    });

    $('#mainCanvas').on('pointermove', function(event){
    // tool.onMouseDrag = function(event) {
      // draw stuff only if the pencil button is active
      if (pencilActive && pencilDown){
        console.log("pointermove!");
        point = new Point();
        point.x = event.clientX - offset.left;
        point.y = event.clientY - offset.top;
        path.add(point);
        //path.add(event.point);
      }
    // } // for tool.onMouseDrag 
    });

    $('#mainCanvas').on('pointerup', function(event){
    // tool.onMouseUp = function(event){
      // draw stuff only if the pencil button is active
      pencilDown = false;
      if (pencilActive){
        console.log("pointerup!");
        path.simplify(10);
      }
    // } // for tool.onMouseUp
    });
  }

  // functions
  
  function getOffset(obj){
    // from https://mobiforge.com/design-development/html5-pointer-events-api-combining-touch-mouse-and-pen
    var offsetLeft = 0;
    var offsetTop = 0;
    do {
      if (!isNaN(obj.offsetLeft)) {
        offsetLeft += obj.offsetLeft;
      }
      if (!isNaN(obj.offsetTop)) {
        offsetTop += obj.offsetTop;
      }
    } while(obj = obj.offsetParent);
    return {left: offsetLeft, top: offsetTop}
  }

}());

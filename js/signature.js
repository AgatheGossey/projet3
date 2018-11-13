function canvas() {

    // THE SIGNATURE CONTEXT

    var signature = document.getElementById("signature");
    var ctx = signature.getContext("2d"); // context
    ctx.strokeStyle = "black"; // the color used for strokes
    ctx.lineWidth = 0.05; // the width of the lines used for strokes

    var sign = false;

    // MOUSE EVENTS

    // Set up mouse events for signature
    var mousePosition = { 
        x:0,
        y:0
    };
    var lastPosition = mousePosition;

    // To activate signature mode
    signature.addEventListener("mousedown", activateSignatureMouse);
    // To deactivate signature mode
    signature.addEventListener("mouseup", deactivateSignatureMouse);
    // Change mouse position for sign
    signature.addEventListener("mousemove", startSignatureMouse);

    function activateSignatureMouse(e) {
        sign = true;
        lastPosition = getMousePosition(signature, e);  //returns the mouse coordinates based on the position of the canvas and the position of the users mouse
    }

    function deactivateSignatureMouse() {
        sign = false;
    }

    function startSignatureMouse(e) {
        mousePosition = getMousePosition(signature, e);
        signLoop();
    }

    function getMousePosition(canvasDom, mouseEvent) {
        var rect = canvasDom.getBoundingClientRect(); //method which sends the size and the position of the canvas relative to viewport
        return {
          x: mouseEvent.clientX - rect.left, // x position of the mouse relative to the canvas // calculates the difference between the mouse coordinates and the left side of the viewport
          y: mouseEvent.clientY - rect.top // y position within the canvas
        };
      }

    // TOUCH EVENTS

    // To activate signature mode
    signature.addEventListener("touchstart", activateSignatureTouch);
    // To deactivate signature mode
    signature.addEventListener("touchend", deactivateSignatureTouch);
    // Change mouse position for sign
    signature.addEventListener("touchmove", startSignatureTouch);

    function activateSignatureTouch(e) {
        sign = true;
        lastPosition = getTouchPosition(signature, e); 
        var touch = e.touches[0]; //reference first touch point 
    }
    function deactivateSignatureTouch(e) {
        sign = false;
    }
    function startSignatureTouch(e) {
        mousePosition = getTouchPosition(signature, e);
        var touch = e.touches[0];
        signLoop();
    }

    function getTouchPosition(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    }
    
    // DRAW TO THE CANVAS
    function renderCanvas() {
        if (sign) {
            ctx.moveTo(lastPosition.x, lastPosition.y); // moves the path
            ctx.lineTo(mousePosition.x, mousePosition.y); // adds a new point, creates a ligne (without tracing)
            ctx.stroke(); // draws the path
            lastPosition = mousePosition;
        }
    }
        
    // ALLOW FOR ANIMATION
    function signLoop () {
        if(sign) {
            window.requestAnimationFrame(signLoop);
            renderCanvas();  
        }
    };
    
    };

canvas();




function canvas() {

    // The signature context
    var signature = document.getElementById("signature");
    var ctx = signature.getContext("2d"); // context
    ctx.strokeStyle = "black"; // the color used for strokes
    ctx.lineWidth = 0.05; // the width of the lines used for strokes

    // Set up mouse events for signature
    var sign = false;
    var mousePosition = { 
        x:0,
        y:0
    };
    var lastPosition = mousePosition;

    // To activate signature mode
    signature.addEventListener("mousedown", activateSignature);
    // To deactivate signature mode
    signature.addEventListener("mouseup", deactivateSignature);
    // Change mouse position for sign
    signature.addEventListener("mousemove", startSignature);

    function activateSignature(e) {
        sign = true;
        lastPosition = getMousePosition(signature, e);  //returns the mouse coordinates based on the position of the canvas and the position of the users mouse
    }

    function deactivateSignature() {
        sign = false;
    }

    function startSignature(e) {
        mousePosition = getMousePosition(signature, e);
        signLoop();
    }

    function getMousePosition(canvasDom, mouseEvent) {
        var rect = canvasDom.getBoundingClientRect(); //method which sends the size and the position of the canvas relative to viewport
        return {
          x: mouseEvent.clientX - rect.left, // x position of the mouse relative to the element // décalage par rapport au bord de mon navigateur 
          y: mouseEvent.clientY - rect.top // y position within the element
        };
      }
    
      // Draw to the canvas
    function renderCanvas() {
        if (sign) {
            ctx.moveTo(lastPosition.x, lastPosition.y); // moves the path
            ctx.lineTo(mousePosition.x, mousePosition.y); // adds a new point, creates a ligne (without tracing)
            ctx.stroke(); // draws the path
            lastPosition = mousePosition;
        }
    }
        
    // Allow for animation
    function signLoop () {
        if(sign) {
            window.requestAnimationFrame(signLoop);
            renderCanvas();  
        }
    };
          
    };

canvas();




var canvas = {

    init : function(signatureId) {
        this.signature = document.getElementById(signatureId);
        this.ctx = signature.getContext("2d"); // context
        this.ctx.lineWidth = 1; // the width of the lines used for strokes
        this.ctx.strokeStyle = "white";
        this.sign = false;
        this.clearSignature = document.getElementById("clearSignature");
        this.mousePosition = { 
            x:0,
            y:0
        };
        this.lastPosition = this.mousePosition;
        this.addListeners();
    },

    addListeners: function() {

    // To activate signature mode
    signature.addEventListener("mousedown", this.activateSignatureMouse.bind(this));
    signature.addEventListener("touchstart", this.activateSignatureTouch.bind(this));

    // To deactivate signature mode
    signature.addEventListener("mouseup", this.deactivateSignatureMouse.bind(this));
    signature.addEventListener("touchend", this.deactivateSignatureTouch.bind(this));

    // Change mouse/touch position for sign
    signature.addEventListener("mousemove", this.startSignatureMouse.bind(this));
    signature.addEventListener("touchmove", this.startSignatureTouch.bind(this));

    // Clear the signature
    clearSignature.addEventListener("click", this.clearSignatureMouse.bind(this));
    // clearSignature.addEventListener("click", this.clearSignatureTouch.bind(this));

    },

    // MOUSE EVENTS 

    activateSignatureMouse: function(e) {
        this.sign = true;
        this.lastPosition = this.getMousePosition(signature, e);  //returns the mouse coordinates based on the position of the canvas and the position of the users mouse
    },

    deactivateSignatureMouse: function() {
        this.sign = false;
    },

    startSignatureMouse: function(e) {
        this.mousePosition = this.getMousePosition(signature, e);
        this.signLoop();
    },

    getMousePosition: function(canvasDom, mouseEvent) {
        var rect = canvasDom.getBoundingClientRect(); //method which sends the size and the position of the canvas relative to viewport
        return {
          x: mouseEvent.clientX - rect.left, // x position of the mouse relative to the canvas // calculates the difference between the mouse coordinates and the left side of the viewport
          y: mouseEvent.clientY - rect.top // y position within the canvas
        };
    },

    clearSignatureMouse: function() {
        this.clearCanvas();
        this.init();
    },

    // TOUCH EVENTS 

    activateSignatureTouch: function(e) {
        this.sign = true;
        this.lastPosition = this.getTouchPosition(signature, e); 
        var touch = e.touches[0]; //reference first touch point 
    },

    deactivateSignatureTouch: function() {
        this.sign = false;
    },

    startSignatureTouch: function(e) {
        this.mousePosition = this.getTouchPosition(signature, e);
        var touch = e.touches[0];
        this.signLoop();
    },

    getTouchPosition: function(canvasDomn, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    },

    // DRAW TO THE CANVAS 

    renderCanvas: function() {
        if (this.sign) {
            this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y); // moves the path
            this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y); // adds a new point, creates a ligne (without tracing)
            this.ctx.stroke(); // draws the path
            this.lastPosition = this.mousePosition;
        }
    },

    clearCanvas: function () {
        signature.width = signature.width
    },

    // ALOW FOR ANIMATION

    signLoop: function() {
        if(this.sign) {
            window.requestAnimationFrame(this.signLoop);
            this.renderCanvas();  
        }
    },

};


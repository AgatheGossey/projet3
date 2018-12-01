var canvas = {

    init : function(signatureId) {
        this.signatureId = signatureId;
        this.signature = document.getElementById(this.signatureId);
        this.ctx = this.signature.getContext("2d"); // context
        this.ctx.lineWidth = 1; // the width of the lines used for strokes
        this.ctx.strokeStyle = "white"; // the color of the lines used for strokes
        this.sign = false;
        this.clearSignatureButton = document.getElementById("clearSignatureButton");
        this.mousePosition = { 
            x:0,
            y:0
        };
        this.lastPosition = this.mousePosition;
        this.addListeners();
    },

    addListeners: function() {

    // To activate signature mode
    this.signature.addEventListener("mousedown", this.activateSignatureMouse.bind(this));
    this.signature.addEventListener("touchstart", this.activateSignatureTouch.bind(this));

    // To deactivate signature mode
    this.signature.addEventListener("mouseup", this.deactivateSignatureMouse.bind(this));
    this.signature.addEventListener("touchend", this.deactivateSignatureTouch.bind(this));

    // Change mouse/touch position for sign
    this.signature.addEventListener("mousemove", this.startSignatureMouse.bind(this));
    this.signature.addEventListener("touchmove", this.startSignatureTouch.bind(this));

    // Clear the signature
    this.clearSignatureButton.addEventListener("click", this.clearSignature.bind(this));

    // Prevent scrolling when touching the canvas
    document.body.addEventListener("touchstart", this.preventScrolling.bind(this));
    document.body.addEventListener("touchend", this.preventScrolling.bind(this));
    document.body.addEventListener("touchmove", this.preventScrolling.bind(this));

    },

    // MOUSE EVENTS 

    activateSignatureMouse: function(e) {
        this.sign = true;
        this.lastPosition = this.getMousePosition(this.signature, e);  //returns the mouse coordinates based on the position of the canvas and the position of the users mouse
    },

    deactivateSignatureMouse: function() {
        this.sign = false;
    },

    startSignatureMouse: function(e) {
        this.mousePosition = this.getMousePosition(this.signature, e);
        this.signLoop();
    },

    getMousePosition: function(canvasDom, mouseEvent) {
        var rect = canvasDom.getBoundingClientRect(); //method which sends the size and the position of the canvas relative to viewport
        return {
          x: mouseEvent.clientX - rect.left, // calculates the difference between the mouse coordinates and the left side of the viewport
          y: mouseEvent.clientY - rect.top // 
        };
    },

    clearSignature: function() {
        this.clearCanvas();
        this.init(this.signatureId);
    },

    // TOUCH EVENTS 

    activateSignatureTouch: function(e) {
        this.sign = true;
        this.lastPosition = this.getTouchPosition(this.signature, e); 
        var touch = e.touches[0]; //reference first touch point 
    },

    deactivateSignatureTouch: function() {
        this.sign = false;
    },

    startSignatureTouch: function(e) {
        this.mousePosition = this.getTouchPosition(this.signature, e);
        var touch = e.touches[0];
        this.signLoop();
    },

    getTouchPosition: function(canvasDom, touchEvent) {
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

    // PREVENT SCROLLING

    preventScrolling: function(e) {
        if (e.target == this.signatureId) {
            e.preventDefault();
            }
    },

};


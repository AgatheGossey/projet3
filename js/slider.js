var slider = {

	init: function(sliderId) {
		this.image = ["img1", "img2", "img3", "img4"];
		this.currentImage = 1;
		this.slideshow = document.getElementById(sliderId);
		this.addListeners();
		this.startSlider();
	},

	addListeners: function() {
		document.querySelector(".next").addEventListener("click", this.nextButtonPress.bind(this));
		document.querySelector(".prev").addEventListener("click", this.prevButtonPress.bind(this));
		document.getElementById("images").addEventListener("click", this.nextButtonPress.bind(this));
		document.querySelector(".pause").addEventListener("click", this.stopSlider.bind(this));
		document.addEventListener("keydown", this.keyPress.bind(this));
	},

	startSlider: function () {
		this.intervalId = setInterval(this.nextImage.bind(this) , 5000);
	},
	
	nextButtonPress: function() {
		this.nextImage();
		this.stopSlider();
	},

	prevButtonPress: function() {
		this.prevImage();
		this.stopSlider();
	},

	nextImage: function() {
		if (this.currentImage < this.image.length) {
			this.currentImage = this.currentImage + 1;
		} else { 
			this.currentImage = 1;
		}	
		this.slideshow.setAttribute("src", "./images/slideshow/"+ this.image[this.currentImage-1]+".jpg");
	},

	prevImage: function() {
		if (this.currentImage < this.image.length + 1 && this.currentImage > 1) {
			this.currentImage = this.currentImage - 1;
		} else {
			this.currentImage = this.image.length;
		}
		this.slideshow.setAttribute("src", "./images/slideshow/"+ this.image[this.currentImage-1]+".jpg");
	},

	keyPress: function(e) {
		if (e.keyCode === 37) {
			this.prevImage();
		}
		else if(e.keyCode === 39) {
			this.nextImage();
		}
	},

	stopSlider: function() {
		clearInterval(this.intervalId);
	},
};




























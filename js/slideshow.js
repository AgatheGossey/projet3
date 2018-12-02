var slider = {

	init: function(sliderId) {
		this.image = ["a", "b", "c", "d"];
		this.currentImage = 1;
		this.slideshow = document.getElementById(sliderId);
		this.addListeners();
		this.startSlider();
	},

	addListeners: function() {
		document.querySelector(".next").addEventListener("click", this.nextImage.bind(this));
		document.querySelector(".prev").addEventListener("click", this.prevImage.bind(this));
		document.getElementById("images").addEventListener("click", this.nextImage.bind(this));
		document.querySelector(".pause").addEventListener("click", this.stopSlider.bind(this));
		document.addEventListener("keydown", this.keyPress.bind(this));
	},

	startSlider: function () {
		this.intervalId = setInterval(this.nextImage.bind(this) , 5000);
	},

	nextImage: function() {
		if (this.currentImage < this.image.length) {
			this.currentImage = this.currentImage + 1;
		} else { 
			this.currentImage = 1;
		}	
		this.slideshow.setAttribute("src", this.image[this.currentImage-1]+".jpg");

		this.stopSlider();
	},

	prevImage: function() {
		if (this.currentImage < this.image.length + 1 && this.currentImage > 1) {
			this.currentImage = this.currentImage - 1;
		} else {
			this.currentImage = this.image.length;
		}
		this.slideshow.setAttribute("src", this.image[this.currentImage-1]+".jpg");

		this.stopSlider();
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




























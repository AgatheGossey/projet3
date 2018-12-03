function init() {

// SLIDESHOW
// creates mainSlider with slider as prototype
var mainSlider = Object.create(slider);
mainSlider.init("images");

// MAP
var mainMap = Object.create(map);
mainMap.init(45.764043, 4.835658999999964);

}

window.onload = init;
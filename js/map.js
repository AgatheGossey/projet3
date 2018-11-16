// creation of the map
var map = L.map('map').setView([45.764043, 4.835658999999964], 15);

// creating the image layer
L.tileLayer("https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}", {
    maxZoom: 18,
}).addTo(map);


// adding markers on the map
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=9e292c7515f5523f83cac0ab672bb104cf9bdd3f", markersPosition);


function markersPosition(markers) {
    var stations = JSON.parse(markers);
    stations.forEach(markerPosition)
};

function markerPosition(station) {
    L.marker([station.position.lat, station.position.lng]).addTo(map);
};



// creation of the map
var map = L.map('map').setView([45.764043, 4.835658999999964], 15);

// creating the image layer
L.tileLayer("https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}", {
    maxZoom: 18,
}).addTo(map);


// adding markers on the map

function getStations() {
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=9e292c7515f5523f83cac0ab672bb104cf9bdd3f", markersPosition);
}
getStations();

function markersPosition(markers) {
    var markersList = JSON.parse(markers);
    markersList.forEach(function(marker) {
        var markerElt = L.marker([marker.position.lat, marker.position.lng]).addTo(map);
        addListener(markerElt, marker);
    });
};

function addListener(markerElt, marker) {
    markerElt.addEventListener("click", function() { describeStation(marker) });
};


function describeStation(station) {
    var status = station.status;
    var available_bikes = station.available_bikes;

    var stateElt = document.getElementById("stateBikeStation");
    stateElt.textContent = "Etat de la station : " + status + " et nombre de vélos disponibles : " + available_bikes;

};

// var map = {

//     init: function(lat, lon) {
//         this.map = L.map('map').setView([lat, lon], 15);
//         this.stateElt = document.getElementById("stateBikeStation");
//         this.ajaxG();
//         this.addListener();
//         // creating the image layer
//         this.L.tileLayer("https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}", {
//             maxZoom: 18,
//         }).addTo(map);

//     },

//     markersPosition: function() {
//         var stations = JSON.parse(this.markers);
//         stations.forEach(this.markerPosition)
//     },
 
//     markerPosition: function() {
//         var marker = L.marker([station.position.lat, station.position.lng]).addTo(map);
//     },

//     addListener: function() {
//         var stations = JSON.parse(markers);
//         var marker = L.marker([station.position.lat, station.position.lng]).addTo(map);
//         this.marker.addEventListener("click", function() { 
//             var status = station.status;
//             var available_bikes = station.available_bikes;
        
//             var stateElt = document.getElementById("stateBikeStation");
//             stateElt.textContent = "Etat de la station : " + status + " et nombre de vélos disponibles : " + available_bikes;
//             });
//     },

//     ajaxG: function() {
//         ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=9e292c7515f5523f83cac0ab672bb104cf9bdd3f", this.markersPosition);
//     }
// }
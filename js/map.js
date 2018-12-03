var map = {

    init: function(lat, lon) {
        this.map = L.map("map").setView([lat, lon], 14); // creation of the map
        L.tileLayer("https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}", { // creating the image layer
            maxZoom: 70,
        }).addTo(this.map);
        this.getStations();
        this.mainReservation = Object.create(reservation);
        this.mainReservation.init("reservation");
    },

    getStations: function() { // make an asynchronous HTTP request to the URL and executes the return function
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=9e292c7515f5523f83cac0ab672bb104cf9bdd3f", this.setMarkersPosition.bind(this));
    },

    setMarkersPosition: function(markers) {
        markers = JSON.parse(markers); // turn the response into a JavaScript objects
        markers.forEach(function(marker) {
            var markerElt = this.map.addLayer(L.marker([marker.position.lat, marker.position.lng])); // adding markers on the map
            this.addListener(markerElt, marker); // adding the description of the status of the station
        }.bind(this));
    },

    addListener: function(markerElt, marker) {
<<<<<<< HEAD
        // this.map.removeLayer(L.marker([marker.position.lat, marker.position.lng]))
=======
>>>>>>> f12a1b63ec48af9b54d89f4d685414cca8d3d9dc
        markerElt.addEventListener("click", function() {
            this.mainReservation.describeStation(marker);
            this.mainReservation.dataForBooking.style.display = "none";
        }.bind(this));
    },
};

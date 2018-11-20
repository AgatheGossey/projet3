var map = {

    init: function(lat, lon) {
        this.map = L.map("map").setView([lat, lon], 14); // creation of the map
        L.tileLayer("https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}", { // creating the image layer
            maxZoom: 18,
        }).addTo(this.map);
        this.getStations();
        // this.button = document.getElementById("buttonReservation");
    },

    getStations: function() { // make an asynchronous HTTP request to the URL and executes the return function
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=9e292c7515f5523f83cac0ab672bb104cf9bdd3f", this.markersPosition.bind(this));
    },

    markersPosition: function(markers) {
        console.log(markers);
        markers = JSON.parse(markers); // turn the response into a JavaScript objects
        markers.forEach(function(marker) {
            var markerElt = L.marker([marker.position.lat, marker.position.lng]).addTo(this.map); // adding markers on the map
            this.addListener(markerElt, marker); // adding the description of the status of the station
        }.bind(this));
    },

    addListener: function(markerElt, marker) {
        markerElt.addEventListener("click", function() { this.describeStation(marker) }.bind(this));
    },

    describeStation: function(station) {
        var address = station.address; // recover the address of the station
        var status = station.status; // recover the status of the station
        var available_bikes = station.available_bikes; // recover the number of bikes available
        var stateElt = document.getElementById("descriptionBikeStation");
        stateElt.innerHTML = "</br> <span>Adresse : </span>" + address + "<br/>" + "<span>Etat de la station : </span>" + status + " <br/> <span>Nombre de vélo(s) disponible(s) : </span>" + available_bikes; // adding text on the site
        // if (status = "CLOSE") {
        //     console.log("coucou");
        //     this.button.setAttribute("disabled", "true");
    // }
    },


};

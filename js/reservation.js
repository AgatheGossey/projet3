var reservation = {

    init : function() {
        this.reservation = document.getElementById("reservation"); //a changer à la fin pour this.reservation = document.getElementById(reservationId);
        this.stateElt = document.getElementById("descriptionBikeStation");
        this.makeBookingButton = document.getElementById("makeAReservation");
        this.mainSignature = Object.create(canvas);
        this.mainTimer = Object.create(timer);
        this.signatureElt = document.getElementById("signature");
        this.clearSignatureElt = document.getElementById("clearSignature");
        this.bookingButton = document.getElementById("bookingButton");
        this.canvasElt = document.getElementById("signature");
        this.cancelBookingElt = document.getElementById("cancelBooking");
        // this.surname = document.getElementById("document");
        // this.missInput = document.getElementById("missInput");
        this.addListeners();
    },

    addListeners: function() {
        this.makeBookingButton.addEventListener("click", this.book.bind(this));
        this.canvasElt.addEventListener("click", function() { this.bookingButton.removeAttribute('disabled') }.bind(this));
        this.bookingButton.addEventListener("click", this.timer.bind(this));
        this.cancelBookingElt.addEventListener("click", this.cancelBooking.bind(this));
    },

    describeStation: function(station) {
        var name = station.name; // recover the name of the station 
        var address = station.address; // recover the address of the station
        var status = station.status; // recover the status of the station
        var available_bikes = station.available_bikes; // recover the number of bikes available
        this.stateElt.innerHTML = name + "</br>"
                        + "<span>Adresse : </span>" + address + "<br/>"
                        + "<span>Etat de la station : </span>" + status + "<br/>" 
                        + "<span> Nombre de vélo(s) disponible(s) : </span>" + available_bikes +"<br/>"  // adding text on the site
        if (status === "OPEN" && available_bikes !== 0 ) {
            this.makeBookingButton.style.display = "block";
        } else if (available_bikes === 0) {
            this.makeBookingButton.style.display = "none";
            this.init();
        }
    },

    book: function() {
        this.mainSignature.init("signature");
        this.reservation.style.display = "block";
    },

    timer: function(e) {
        this.mainTimer.init("buttonReservation", 1200);
        this.mainTimer.startTimer();
        this.bookingButton.style.display = "none";
        this.cancelBookingElt.style.display = "block";
        e.preventDefault();
    },

    cancelBooking: function(e) {
        // e.preventDefault();
        this.mainTimer.resetTimer();
        this.bookingButton.style.display = "block";
        this.cancelBookingElt.style.display = "none";
        this.reservation.style.display = "none";
    }




   

    


}




var reservation = {

    init : function() {
        this.reservation = document.getElementById("reservation"); //a changer à la fin pour this.reservation = document.getElementById(reservationId);
        this.stateElt = document.getElementById("descriptionBikeStation");
        this.makeReservationButton = document.getElementById("makeAReservationButton");
        this.mainSignature = Object.create(canvas);
        this.mainTimer = Object.create(timer);
        this.signatureElt = document.getElementById("signature");
        this.clearSignatureElt = document.getElementById("clearSignatureButton");
        this.reservationButton = document.getElementById("reservationButton");
        this.canvasElt = document.getElementById("signature");
        this.cancelBookingElt = document.getElementById("cancelBookingButton");
        this.reservationDetails = document.getElementById("detailsOfTheReservation");
        this.form = document.querySelector("form");
        this.nameForm = document.getElementById("nameForm");
        this.surnameForm = document.getElementById("surnameForm");
        this.reservationData = document.getElementById("dataForBooking");
        this.addListeners();
    },

    addListeners: function() {
        this.makeReservationButton.addEventListener("click", this.book.bind(this));
        this.canvasElt.addEventListener("click", function() { this.reservationButton.removeAttribute('disabled') }.bind(this));
        this.reservationButton.addEventListener("click", this.verifPseudo.bind(this));
        this.cancelBookingElt.addEventListener("click", this.cancelBooking.bind(this));
        this.clearSignatureElt.addEventListener("click", function () { this.reservationButton.setAttribute("disabled", true) }.bind(this));
        // this.reservationButton.addEventListener("click", function() {
        //     localStorage.setItem("this.name", this.name);
        //     // localStorage.setItem("this.name", this.nameForm.value);
        //     // localStorage.setItem("this.name", this.nameForm.value);
        //     // localStorage.setItem("this.name", this.nameForm.value);
        //     alert("Le texte est sauvegardé.");
        //   });
    },

    describeStation: function(station) {
        this.name = station.name; // recover the name of the station 
        this.address = station.address; // recover the address of the station
        this.status = station.status; // recover the status of the station
        this.available_bikes = station.available_bikes; // recover the number of bikes available
        this.stateElt.innerHTML = this.name + "</br>"
                        + "<span>Adresse : </span>" + this.address + "<br/>"
                        + "<span>Etat de la station : </span>" + this.status + "<br/>" 
                        + "<span> Nombre de vélo(s) disponible(s) : </span>" + this.available_bikes +"<br/>"  // adding text on the site
        if (this.status === "OPEN" && this.available_bikes !== 0 ) {
            this.makeReservationButton.style.display = "block";
        } else if (this.available_bikes === 0) {
            this.makeReservationButton.style.display = "none";
            this.init();
        }
    },

    book: function() {
        this.makeReservationButton.style.display = "none";
        this.mainSignature.init("signature");
        this.reservation.style.display = "block";
        this.reservationData.style.display = "block";
        this.reservationButton.setAttribute("disabled", true);
    
    },

    verifPseudo: function(e) {
        if (this.nameForm.value != "" && this.surnameForm.value !== "") {
            e.preventDefault();
            this.timer();
        }
    },
    
    timer: function() {
        this.mainTimer.init("countingDisplay", 1200);
        this.mainTimer.startTimer();
        this.makeReservationButton.setAttribute("disabled", true);
        this.reservationDetails.innerHTML = "Vélo réservé à la station " + this.name 
                                    + " par " + this.surnameForm.value + " "+ this.nameForm.value
        this.reservationData.style.display = "none";
        this.cancelBookingElt.style.display = "block";
    },

    cancelBooking: function(e) {
        e.preventDefault();
        this.makeReservationButton.style.display = "block";
        this.makeReservationButton.removeAttribute("disabled");
        this.mainTimer.resetTimer();
        this.reservationDetails.textContent = "";
        this.cancelBookingElt.style.display = "none";
        this.reservation.style.display = "none";
    },
}


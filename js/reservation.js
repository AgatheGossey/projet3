var reservation = {

    init : function(reservationId) {
        this.reservation = document.getElementById(reservationId);
        this.reservationElt = document.getElementById("reservationElt");
        this.descriptionBikeStation = document.getElementById("descriptionBikeStation");
        this.makeAReservationButton = document.getElementById("makeAReservationButton");
        this.clearSignatureButton = document.getElementById("clearSignatureButton");
        this.reservationButton = document.getElementById("reservationButton");
        this.signature = document.getElementById("signature");
        this.cancelReservationButton = document.getElementById("cancelReservationButton");
        this.detailsOfTheReservation = document.getElementById("detailsOfTheReservation");
        this.form = document.querySelector("form");
        this.nameForm = document.getElementById("nameForm");
        this.surnameForm = document.getElementById("surnameForm");
        this.dataForBooking = document.getElementById("dataForBooking");
        this.mainSignature = Object.create(canvas);
        this.mainTimer = Object.create(timer);
        this.addListeners();
    },

    addListeners: function() {
        this.makeAReservationButton.addEventListener("click", this.bookTheBike.bind(this));
        this.signature.addEventListener("click", function() { this.reservationButton.removeAttribute('disabled') }.bind(this));
        this.clearSignatureButton.addEventListener("click", function () { this.reservationButton.setAttribute("disabled", true) }.bind(this));
        this.reservationButton.addEventListener("click", this.checkTheForm.bind(this));
        this.cancelReservationButton.addEventListener("click", this.cancelTheReservation.bind(this));

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
        this.descriptionBikeStation.innerHTML = this.name + "</br>"
                        + "<span>Adresse : </span>" + this.address + "<br/>"
                        + "<span>Etat de la station : </span>" + this.status + "<br/>" 
                        + "<span> Nombre de vélo(s) disponible(s) : </span>" + this.available_bikes +"<br/>"  // adding text on the site
        if (this.status === "OPEN" && this.available_bikes !== 0 ) {
            this.makeAReservationButton.style.display = "block";
        } else if (this.available_bikes === 0) {
            this.makeAReservationButton.style.display = "none";
            this.init();
        }
    },

    bookTheBike: function() {
        this.makeAReservationButton.style.display = "none";
        this.reservationElt.style.display = "block";
        this.dataForBooking.style.display = "block";
        this.mainSignature.init("signature");
        this.reservationButton.setAttribute("disabled", true);
    },

    checkTheForm: function(e) {
        if (this.nameForm.value != "" && this.surnameForm.value !== "") {
            e.preventDefault(); // the default action that belongs to the event will not occur
            this.formatTheReservationElt();
            this.formatTheTimerElt();
            this.startTheTimer();
        }
    },
    
        formatTheReservationElt: function() {
            this.makeAReservationButton.setAttribute("disabled", true);
            this.dataForBooking.style.display = "none";
            this.cancelReservationButton.style.display = "block";
        },

        formatTheTimerElt: function() {
            this.detailsOfTheReservation.innerHTML = "Vélo réservé à la station " + this.name 
                                                    + " par " + this.surnameForm.value + " "+ this.nameForm.value;
        },

        startTheTimer: function() {
            this.mainTimer.init("countingDisplay", 1200);
            this.mainTimer.startTimer();
        },

    cancelTheReservation: function(e) {
        e.preventDefault(); 
        this.formatTheCancellationElt();
        this.formatTheCancellationOfTimerElt();
    },

        formatTheCancellationElt: function() {
            this.cancelReservationButton.style.display = "none";
            this.makeAReservationButton.removeAttribute("disabled");
            this.makeAReservationButton.style.display = "block";
            this.reservationElt.style.display = "none";
        },

        formatTheCancellationOfTimerElt: function() {
            this.mainTimer.resetTimer();
            this.detailsOfTheReservation.textContent = "";
        },

}


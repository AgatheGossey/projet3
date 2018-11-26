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
        this.textTimerElt = document.getElementById("textTimer");
        this.form = document.querySelector("form");
        this.nameForm = document.getElementById("nameForm");
        this.surnameForm = document.getElementById("surnameForm");
        this.test = document.getElementById("test");
        this.addListeners();
    },

    addListeners: function() {
        this.makeBookingButton.addEventListener("click", this.book.bind(this));
        this.canvasElt.addEventListener("click", function() { this.bookingButton.removeAttribute('disabled') }.bind(this));
        this.bookingButton.addEventListener("click", this.verifPseudo.bind(this));
        this.cancelBookingElt.addEventListener("click", this.cancelBooking.bind(this));
        // this.bookingButton.addEventListener("click", function() {
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
            this.makeBookingButton.style.display = "block";
        } else if (this.available_bikes === 0) {
            this.makeBookingButton.style.display = "none";
            this.init();
        }
    },

    book: function() {
        this.mainSignature.init("signature");
        this.reservation.style.display = "block";
        this.test.style.display = "block";
        this.bookingButton.setAttribute("disabled", true);
    
    },

    verifPseudo: function(e) {
        if (this.nameForm.value != "" && this.surnameForm.value !== "") {
            e.preventDefault();
            this.timer();
        }
    },
    
    timer: function() {
        this.mainTimer.init("buttonReservation", 1200);
        this.mainTimer.startTimer();
        this.makeBookingButton.setAttribute("disabled", true);
        this.textTimerElt.innerHTML = "Vélo réservé à la station " + this.name + " par " + this.surnameForm.value + " " + this.nameForm.value + "<br/> Temps restant : " + this.mainTimer.minutes + "min et " + this.mainTimer.seconds +"s"; 
        this.bookingButton.style.display = "none";
        this.test.style.display = "none";
        this.cancelBookingElt.style.display = "block";
    },

    cancelBooking: function(e) {
        e.preventDefault();
        this.makeBookingButton.removeAttribute("disabled");
        this.mainTimer.resetTimer();
        this.textTimerElt.textContent = "";
        this.bookingButton.style.display = "block";
        this.cancelBookingElt.style.display = "none";
        this.reservation.style.display = "none";
    },




}

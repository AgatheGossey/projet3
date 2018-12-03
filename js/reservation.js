var reservation = {

    init : function(reservationId) {
        this.reservation = document.getElementById(reservationId);
        this.reservationElt = document.getElementById("reservationElt");
        this.introduction = document.getElementById("introduction");
        this.details = document.getElementById("details");
        this.detailsTitle = document.getElementById("detailsTitle");
        this.descriptionBikeStation = document.getElementById("descriptionBikeStation");
        this.makeAReservationButton = document.getElementById("makeAReservationButton");
        this.clearSignatureButton = document.getElementById("clearSignatureButton");
        this.reservationButton = document.getElementById("reservationButton");
        this.signature = document.getElementById("signature");
        this.cancelReservationButton = document.getElementById("cancelReservationButton");
        this.detailsOfTheReservation = document.getElementById("detailsOfTheReservation");
        this.nameForm = document.getElementById("nameForm");
        this.surnameForm = document.getElementById("surnameForm");
        this.dataForBooking = document.getElementById("dataForBooking");
        this.countingDisplay = document.getElementById("countingDisplay");
        this.userReservationData = document.getElementById("userReservationData");
        this.mainSignature = Object.create(canvas);
        this.mainTimer = Object.create(timer);
        this.addListeners();
    },

    addListeners: function() {
        this.makeAReservationButton.addEventListener("click", this.bookTheBike.bind(this));
        this.signature.addEventListener("click", function() { this.reservationButton.removeAttribute('disabled') }.bind(this)); // reactive the reservation button to be sure that the user has signed
        this.signature.addEventListener("touchmove", function() { this.reservationButton.removeAttribute('disabled') }.bind(this));
        this.clearSignatureButton.addEventListener("click", function () { this.reservationButton.setAttribute("disabled", true) }.bind(this));
        this.reservationButton.addEventListener("click", this.checkTheForm.bind(this));
        this.cancelReservationButton.addEventListener("click", this.cancelTheReservation.bind(this));
    },

    describeStation: function(station) {
        this.details.style.display = "block";
        this.introduction.style.display ="none";
        this.detailsTitle.style.display = "block";
        this.name = station.name; // recover the name of the station 
        this.address = station.address; // recover the address of the station
        this.status = station.status; // recover the status of the station
        this.available_bikes = station.available_bikes; // recover the number of bikes available
        this.descriptionBikeStation.innerHTML = this.name + "</br>"
                        + "<span>Adresse : </span>" + this.address + "<br/>"
                        + "<span>Etat : </span>" + this.status + "<br/>" 
                        + "<span> Nombre de vélo(s) disponible(s) : </span>" + this.available_bikes +"<br/>"  // adding text on the site
        if (this.status === "OPEN" && this.available_bikes !== 0 ) { 
            this.makeAReservationButton.style.display = "block"; // if the station is open and bicycles are available, the button "make a reservation" appears
        } else if (this.status === "CLOSED" || this.available_bikes === 0) {
            this.makeAReservationButton.style.display = "none"; // else the button does not appear
        }
    },

    bookTheBike: function() {
        // returns the value associated with the key passed as a parameter
        this.nameForm.value = localStorage.getItem('name');
        this.surnameForm.value = localStorage.getItem('surname');
        this.makeAReservationButton.style.display = "none";
        this.reservationElt.style.display = "flex";
        this.dataForBooking.style.display = "block";
        this.mainSignature.init("signature");
        this.reservationButton.setAttribute("disabled", true); // deactivate the reservation button 
    },

    checkTheForm: function(e) {
        if (this.nameForm.value != "" && this.surnameForm.value !== "") {  // if the elements of the form are completed
            e.preventDefault(); // the default action that belongs to the event will not occur
            this.startDate = new Date(); // save the date of the reservation to use if the user closes the page
            this.formatTheReservationElt();
            this.formatTheTimerElt();
            this.startTheTimer();
            // adds to the local storage
            localStorage.setItem('name', this.nameForm.value);
            localStorage.setItem('surname', this.surnameForm.value);
            // adds to the session storage
            sessionStorage.setItem('stationName', this.name);
            sessionStorage.setItem('startDate', this.startDate);
        }
    },
    
    formatTheReservationElt: function() {
        this.makeAReservationButton.setAttribute("disabled", true);
        this.dataForBooking.style.display = "none";
        this.cancelReservationButton.style.display = "block";
        this.mainSignature.clearSignature();
    },

    formatTheTimerElt: function() {
        this.detailsOfTheReservation.innerHTML = "Vélo réservé à la station <span>" + this.name +"</span>"
                                                + " par <span>" + this.surnameForm.value + "</span> <span>"
                                                + this.nameForm.value + "</span></br>";
        this.scrollToBottom(); // scrolls the specified element into the visible area of window
    },

    scrollToBottom: function() {
        this.userReservationData.scrollIntoView(false);
    },

    startTheTimer: function() {
        this.mainTimer.init("countingDisplay", 1200);
        this.mainTimer.startTimer();
    },

    cancelTheReservation: function(e) {
        e.preventDefault();
        sessionStorage.clear();
        this.formatTheCancellationElt();
        this.formatTheCancellationOfTimerElt();
    },

    formatTheCancellationElt: function() {
        this.details.style.display = "none";
        this.cancelReservationButton.style.display = "none";
        this.introduction.innerText = "Cliquez sur une station pour obtenir des détails sur celle ci et réserver votre vélo.";
        this.introduction.style.display ="block";
        this.makeAReservationButton.removeAttribute("disabled");
        this.reservationElt.style.display = "none";
        if (this.status === "OPEN" && this.available_bikes !== 0 ) {
            this.makeAReservationButton.style.display = "block";
        }
    },

    formatTheCancellationOfTimerElt: function() {
        this.mainTimer.resetTimer();
        this.detailsOfTheReservation.textContent = "";
        this.countingDisplay.textContent = "";
    },

}


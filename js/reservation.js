var reservation = {

    init : function(reservationId) {

        this.reservation = document.getElementById(reservationId);
        this.introduction = document.getElementById("introduction");

        // container of station details
        this.details = document.getElementById("details");
        this.detailsTitle = document.getElementById("detailsTitle");
        this.stationDetails = document.getElementById("stationDetails");
        this.makeAReservationButton = document.getElementById("makeAReservationButton");

        // container of the elements to make the reservation
        this.reservationElt = document.getElementById("reservationElt");
        this.dataForBooking = document.getElementById("dataForBooking");
        this.nameForm = document.getElementById("nameForm");
        this.surnameForm = document.getElementById("surnameForm");
        this.signature = document.getElementById("signature");
        this.clearSignatureButton = document.getElementById("clearSignatureButton");
        this.reservationButton = document.getElementById("reservationButton");

        // container of the elements of the reservation
        this.cancelReservationButton = document.getElementById("cancelReservationButton");
        this.userReservationData = document.getElementById("userReservationData");
        this.detailsOfTheReservation = document.getElementById("detailsOfTheReservation");
        this.counterElt = document.getElementById("counterElt");

        // creating objects
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
        this.introduction.style.display ="none"; 
        this.details.style.display = "block";
        this.detailsTitle.style.display = "block";
        this.stationNumber = station.number;
        // recover information from a station 
        this.name = station.name; 
        this.address = station.address; 
        this.status = station.status; 
        this.available_bikes = station.available_bikes; 
        this.stationDetails.innerHTML = this.name + "</br>"
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
            // Make a new call to the API to verify that a bike is still available
            ajaxGet("https://api.jcdecaux.com/vls/v1/stations/"+ this.stationNumber +"?contract=Lyon&apiKey=9e292c7515f5523f83cac0ab672bb104cf9bdd3f", function(station) {
                station = JSON.parse(station);
                if (station.available_bikes > 0) {
                    this.startDate = new Date(); // save the date of the reservation to use if the user closes the page
                    this.formatTheDetails();
                    this.formatTheReservationElt();
                    this.formatTheUserData();
                    this.startTheTimer();
                    // adds to the local storage
                    localStorage.setItem('name', this.nameForm.value);
                    localStorage.setItem('surname', this.surnameForm.value);
                    // adds to the session storage
                    sessionStorage.setItem('stationName', this.name);
                    sessionStorage.setItem('startDate', this.startDate);
                } else {
                    this.introduction.style.display = "block";
                    this.introduction.innerText = "Il n'y a plus de vélos disponibles. Merci de sélectionnez une autre station.";
                    this.details.style.display = "none";
                    this.reservationElt.style.display = "none";
                }
            }.bind(this));
        }
    },

    formatTheDetails: function() {
        this.available_bikes_update = this.available_bikes - 1; // increment the number of available bikes
        this.stationDetails.innerHTML = this.name + "</br>"
                        + "<span>Adresse : </span>" + this.address + "<br/>"
                        + "<span>Etat : </span>" + this.status + "<br/>" 
                        + "<span> Nombre de vélo(s) disponible(s) : </span>" + this.available_bikes_update +"<br/>"
        this.makeAReservationButton.setAttribute("disabled", true);
    },
    
    formatTheReservationElt: function() {
        this.dataForBooking.style.display = "none";
        this.cancelReservationButton.style.display = "block";
        this.mainSignature.clearSignature();
    },

    formatTheUserData: function() {
        this.detailsOfTheReservation.innerHTML = "Vélo réservé à la station <span>" + this.name +"</span>"
                                                + " par <span>" + this.surnameForm.value + "</span> <span>"
                                                + this.nameForm.value + "</span></br>";
        this.userReservationData.scrollIntoView(false); // scrolls the specified element into the visible area of window
    },

    startTheTimer: function() {
        this.mainTimer.init("counterElt", 1200);
        this.mainTimer.startTimer();
    },

    cancelTheReservation: function(e) {
        e.preventDefault();
        sessionStorage.clear(); // cancel the storage 
        this.formatTheCancellationElt();
        this.formatTheCancellationOfTimerElt();
    },

    formatTheCancellationElt: function() {
        this.introduction.style.display ="block";
        this.introduction.innerText = "Cliquez sur une station pour obtenir des détails sur celle ci et réserver votre vélo.";
        this.details.style.display = "none";
        this.makeAReservationButton.removeAttribute("disabled");
        this.cancelReservationButton.style.display = "none";
        if (this.status === "OPEN" && this.available_bikes !== 0 ) {
            this.makeAReservationButton.style.display = "block";
        }
    },

    formatTheCancellationOfTimerElt: function() {
        this.mainTimer.resetTimer();
        this.detailsOfTheReservation.textContent = "";
        this.counterElt.textContent = "";
    },

}


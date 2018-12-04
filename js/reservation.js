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

        // event at the click of the buttons
        this.makeAReservationButton.addEventListener("click", this.bookTheBike.bind(this));
        this.reservationButton.addEventListener("click", this.checkTheReservation.bind(this));
        this.cancelReservationButton.addEventListener("click", this.cancelTheReservation.bind(this));

        // reaction of the reservationBubutton to be sure that the user has signed
        this.signature.addEventListener("click", function() { this.reservationButton.removeAttribute('disabled') }.bind(this)); 
        this.signature.addEventListener("touchmove", function() { this.reservationButton.removeAttribute('disabled') }.bind(this));
        this.clearSignatureButton.addEventListener("click", function () { this.reservationButton.setAttribute("disabled", true) }.bind(this));

    },


    // DETAILS OF THE CHOSEN STATION

    describeStation: function(station) {

        // recover information from a station 
        this.stationNumber = station.number;
        this.name = station.name; 
        this.address = station.address; 
        this.status = station.status; 
        if (sessionStorage.getItem("stationName") === this.name) {
            this.availableBikes = station.available_bikes - 1; // if there is a reservation in progress for the station, there is 1 bike less available
        } else {
            this.availableBikes = station.available_bikes;
        };
        
        // layout of the element
        this.introduction.style.display ="none"; 
        this.details.style.display = "block";
        this.detailsTitle.style.display = "block";
        this.stationDetails.innerHTML = this.name + "</br>"
                        + "<span>Adresse : </span>" + this.address + "<br/>"
                        + "<span>Etat : </span>" + this.status + "<br/>" 
                        + "<span> Nombre de vélo(s) disponible(s) : </span>" + this.availableBikes +"<br/>";
        if (this.status === "OPEN" && this.availableBikes !== 0 ) { 
            this.makeAReservationButton.style.display = "block"; // if the station is open and bicycles are available, the button "make a reservation" appears
        } else if (this.status === "CLOSED" || this.availableBikes === 0) {
            this.makeAReservationButton.style.display = "none"; // else the button does not appear
                        }
                        
    },


    // DISPLAY OF THE ELEMENTS TO MAKE THE RESERVATION

    bookTheBike: function() {

        // API WEB STORAGE - returns the value associated with the key passed as a parameter
        this.nameForm.value = localStorage.getItem('name');
        this.surnameForm.value = localStorage.getItem('surname');

        // layout of the element
        this.makeAReservationButton.style.display = "none";
        this.reservationElt.style.display = "flex";
        this.dataForBooking.style.display = "block";
        this.mainSignature.init("signature");
        this.reservationButton.setAttribute("disabled", true); 
    },


    // BEHAVIOR WHEN THE RESERVATION IS MADE

    checkTheReservation: function(e) {
    // checks before confirming the reservation

        // first : check the form 
        if (this.nameForm.value != "" && this.surnameForm.value !== "") {  

            e.preventDefault(); // the default action that belongs to the event will not occur

            // second : check that a bike is still available
            ajaxGet("https://api.jcdecaux.com/vls/v1/stations/"+ this.stationNumber +"?contract=Lyon&apiKey=9e292c7515f5523f83cac0ab672bb104cf9bdd3f", function(station) {
                station = JSON.parse(station);

                if (this.availableBikes > 0) {

                    // layout of the elements                    
                    this.formatTheDetails();
                    this.formatTheReservationElt();
                    this.formatTheUserData();
                    this.startTheTimer();

                    // API WEB STORAGE 
                    this.startDate = new Date(); // save the date of the reservation to use if the user closes the page
                    // adds to the local storage
                    localStorage.setItem('name', this.nameForm.value);
                    localStorage.setItem('surname', this.surnameForm.value);
                    // adds to the session storage
                    sessionStorage.setItem('stationName', this.name);
                    sessionStorage.setItem('startDate', this.startDate);

                } else {

                    // layout of the element
                    this.introduction.style.display = "block";
                    this.introduction.innerText = "Il n'y a plus de vélos disponibles. Merci de sélectionnez une autre station.";
                    this.details.style.display = "none";
                    this.reservationElt.style.display = "none";

                }

            }.bind(this));
        }
    },

    formatTheDetails: function() {
        this.availableBikes_update = this.availableBikes - 1; // increment the number of available bikes
        this.stationDetails.innerHTML = this.name + "</br>"
                        + "<span>Adresse : </span>" + this.address + "<br/>"
                        + "<span>Etat : </span>" + this.status + "<br/>" 
                        + "<span> Nombre de vélo(s) disponible(s) : </span>" + this.availableBikes_update +"<br/>"
        this.makeAReservationButton.setAttribute("disabled", true);
    },
    
    formatTheReservationElt: function() {
        this.dataForBooking.style.display = "none";
        this.mainSignature.clearSignature();
        this.cancelReservationButton.style.display = "block";
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

    
    // CANCEL THE RESERVATION 

    cancelTheReservation: function(e) {

        e.preventDefault();

        // API WEB STORAGE 
        sessionStorage.clear(); // cancel the storage 

        // layout of the element
        this.formatTheCancellationElt();
        this.formatTheCancellationOfTimerElt();
        
    },

    formatTheCancellationElt: function() {
        this.introduction.style.display ="block";
        this.introduction.innerText = "Cliquez sur une station pour obtenir des détails sur celle ci et réserver votre vélo.";
        this.details.style.display = "none";
        this.makeAReservationButton.removeAttribute("disabled");
        this.cancelReservationButton.style.display = "none";
        if (this.status === "OPEN" && this.availableBikes !== 0 ) {
            this.makeAReservationButton.style.display = "block";
        }
    },

    formatTheCancellationOfTimerElt: function() {
        this.mainTimer.resetTimer();
        this.detailsOfTheReservation.textContent = "";
        this.counterElt.textContent = "";
    },

}


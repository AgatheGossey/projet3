function init() {

    // SLIDESHOW
    // creates mainSlider with slider as prototype
    var mainSlider = Object.create(slider);
    mainSlider.init("images");

    // MAP
    var mainMap = Object.create(map);
    mainMap.init(45.764043, 4.835658999999964);

    // RESERVATION DATA IF RESTORATION OF THE PAGE
    var stationName = sessionStorage.getItem("stationName");
    var startDate = new Date(sessionStorage.getItem('startDate')).getTime(); // returns the value associated with the key passed as a parameter and returns the date in milliseconds since January 1, 1970
    var endDate = startDate + 1200000; // The expiry date is equal to the date of the booking + 20 minutes converted to milliseconds
    var date = new Date().getTime(); // date in restoration of the page in milliseconds
    if (startDate) {  
        var timeLeft = Math.trunc((endDate - date) / 1000);
        if (timeLeft > 0) { 
            var introduction = document.getElementById("introduction");
            document.getElementById("reservationElt").style.display = "block";

            introduction.innerText = "Vous avez déjà une réservation en cours.";

            document.getElementById("dataForBooking").style.display = "none";

            var mainReservation = Object.create(reservation);
            
            mainReservation.init("reservation");
            mainReservation.mainSignature.init("signature");
            mainReservation.mainTimer.init("countingDisplay", timeLeft);

            mainReservation.name = stationName;
            
            mainReservation.formatTheTimerElt();
            mainReservation.formatTheReservationElt();
            mainReservation.mainTimer.startTimer();
        } 
    };   

};

window.onload = init;
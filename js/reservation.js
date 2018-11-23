var reservation = {

    init : function(reservation) {
        this.reservation = document.getElementById("reservation"); //a changer à la fin pour this.reservation = document.getElementById(reservationId);
        this.stateElt = document.getElementById("descriptionBikeStation");
        this.makeReservationButton = document.getElementById("makeAReservation");
        this.h2Elt = document.getElementById("signatureTitle");
        this.formElt = document.getElementById("form");
        this.nameFormElt = document.getElementById("name");
        this.surnameFormElt = document.getElementById("surname");
        this.formEndElt = document.getElementById("formEnd");
        this.mainSignature = Object.create(canvas);
        this.signatureElt = document.getElementById("signature");
        this.clearSignatureElt = document.getElementById("clearSignature");
        this.reservationButton = document.getElementById("buttonReservation");
        this.reserverElt = document.getElementById("reserver");
        this.addListeners();
    },

    addListeners: function() {
        document.getElementById("reservation").addEventListener("click", this.describeStation.bind(this));
        this.makeReservationButton.addEventListener("click", this.book.bind(this));
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
            this.makeReservationButton.innerHTML = "<button>Faire une réservation</button>";
        } else if (available_bikes === 0) {
            this.makeReservationButton.innerHTML = "";
            this.reservation.innerHTML = "<div id='reservation'>"
            + "<div id='buttonReservation'></div>"
            + "<div id='signatureTitle'></div>"
            + "<div id='form'></div>"
            + "<div id='canvas'><canvas id='signature'></canvas></div> "
            + "<div id='clearSignature'></div></div>";
            this.init();
        }
    },

    book: function() {
        this.h2Elt.innerHTML = "<h2>Réservation :</h2>";
        this.formElt.innerHTML = "<form>" 
                                + "<p> <label for='nom'>Nom</label> : <input type='text' name='name' placeholder='Nom' required pattern='[A-Za-z]'> </p>"
                                + "<p> <label for='prénom'>Prénom</label> : <input type='text' name='surname' placeholder='Prénom' required pattern='[A-Za-z]'> </p>";
                                + this.mainSignature.init("signature");
                                + this.signatureElt.innerHTML === "<div></div>";
                                + this.signatureElt.classList.add("signatureContainer");
                                + this.clearSignatureElt.innerHTML === "<button>Effacer</button>";
                                + "<input type='submit' id='test' value='Réserver mon velo'>";
                                + "</form>";


                                

                            



        
// if (form rempli, canvas rempli) {
//         this.reservationButton.innerHTML = "<button>Réserver</button>"; 

    },


}






// var reservation = {

//     init : function(reservation) {
//         this.reservation = document.getElementById(reservation);
//         this.reservationButton = document.getElementById("buttonReservation");
//         this.stateElt = document.getElementById("descriptionBikeStation");
//         // this.h2Elt = document.getElementById("signatureTitle");

//         // this.formElt = document.getElementById("form");
//         // this.signatureElt = document.getElementById("signature");
//         // this.clearSignatureElt = document.getElementById("clearSignature");
//         this.addListeners();

//     },

//     addListeners: function(e) {
//        e.addEventListener("click", this.describeStation.bind(this));
//         this.reservationButton.addEventListener("click", this.book.bind(this));
//     },
    
//     describeStation: function(station) {
//         var name = station.name; // recover the name of the station 
//         var address = station.address; // recover the address of the station
//         var status = station.status; // recover the status of the station
//         var available_bikes = station.available_bikes; // recover the number of bikes available
//         var stateElt = document.getElementById("descriptionBikeStation");
//         stateElt.innerHTML = name + "</br>"
//                         + "<span>Adresse : </span>" + address + "<br/>"
//                         + "<span>Etat de la station : </span>" + status + "<br/>" 
//                         + "<span> Nombre de vélo(s) disponible(s) : </span>" + available_bikes +"<br/>"  // adding text on the site
//         if (status === "OPEN" && available_bikes !== 0 ) {

//         var reservationButton = document.getElementById("buttonReservation");
//         reservationButton.innerHTML = "<button>Réserver</button>"; 
        
//         } else if (available_bikes === 0) {
//             this.reservation.innerHTML = "<div id='reservation'><div id='buttonReservation'></div><div id='signatureTitle'></div><div id='form'></div><div id='canvas'><canvas id='signature'></canvas></div> <div id='clearSignature'></div></div>";
//         this.init();
//     }
//     },

// }

// //     book: function() {
// //         var mainTimer = Object.create(timer);
// //         mainTimer.init("buttonReservation", 1200);
// //         var h2Elt = document.getElementById("signatureTitle");
// //         h2Elt.innerHTML = "<h2>Réservation :</h2>";
// //         var formElt = document.getElementById("form");
// //         formElt.innerHTML = "<form> <p> <label for='nom'>Nom</label> : <input type='text' name='name' id='name' required> </p> <p> <label for='prénom'>Prénom</label> : <input type='text' name='surname' id='surname' required> </p> </form>";
// //         var mainSignature = Object.create(canvas);
// //         mainSignature.init("signature");
// //         var signatureElt = document.getElementById("signature");
// //         signatureElt.innerHTML = "<div></div>";
// //         signatureElt.classList.add("signatureContainer");
// //         var clearSignatureElt = document.getElementById("clearSignature");
// //         clearSignatureElt.innerHTML = "<button>Effacer</button>";
// //         // if (this.addListeners()) {
// //         //     this.init();  -> if on reclique sur un marqueur, la partie réservation s'efface. 
// //         // }
// //     }



// //     // //    this.reservationButton.addEventListener("click", function() { 
// //     //     var mainTimer = Object.create(timer);
// //     //     mainTimer.init("buttonReservation", 1200);
// //     //     var h2Elt = document.getElementById("signatureTitle");
// //     //     h2Elt.innerHTML = "<h2>Réservation :</h2>";
// //     //     var formElt = document.getElementById("form");
// //     //     formElt.innerHTML = "<form> <p> <label for='nom'>Nom</label> : <input type='text' name='name' id='name' required> </p> <p> <label for='prénom'>Prénom</label> : <input type='text' name='surname' id='surname' required> </p> </form>";
// //     //     var mainSignature = Object.create(canvas);
// //     //     mainSignature.init("signature");
// //     //     var signatureElt = document.getElementById("signature");
// //     //     signatureElt.innerHTML = "<div></div>";
// //     //     signatureElt.classList.add("signatureContainer");
// //     //     var clearSignatureElt = document.getElementById("clearSignature");
// //     //     clearSignatureElt.innerHTML = "<button>Effacer</button>";
// //     // //    }


// //        };

// // // this.reservationT.innerHTML = "<div id='reservation'><div id='buttonReservation'></div><div id='signatureTitle'><h2></h2></div><div id='form'></div><div id='canvas'><canvas id='signature'></canvas></div> <div id='clearSignature'></div></div>";

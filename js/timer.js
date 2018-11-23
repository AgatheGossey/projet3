var timer = {

    init: function(timerId, duration) {
        this.timer = document.getElementById(timerId);
        this.selectedDuration = duration;
        this.button = document.getElementById("buttonReservation");
        this.clearSignature = document.getElementById("clearSignature");
        this.textTimerElt = document.getElementById("textTimer");
        this.counter = duration; // number of seconds in 20 minutes
        this.addListeners();
        this.cancelElt = document.getElementById("buttonReservation");
        this.isStarted = true;
    },
    
    addListeners: function() {
        this.button.addEventListener("click", this.buttonReservationEvent.bind(this))
    },

    buttonReservationEvent: function() {
        if (this.isStarted === true) {
            this.startTimer();
        } else if  (this.isStarted === false) {
            clearInterval(this.intervalId);
            this.button.innerHTML = "<button>Réserver</button>";
            this.textTimerElt.textContent = "";
            this.resetTimer();
            this.isStarted = true;
        }
    },
    
    startTimer: function () {
        this.isStarted = true;
        this.intervalId = setInterval(this.decreaseTimer.bind(this), 1000); // call the "decreaseTimer" function repeatedly, with a delay set at 1000 milliseconds
        this.cancelTimer();
        this.clearSignature.setAttribute("disabled", true); // disable the reservation button
    },
    
    cancelTimer : function() {
        this.isStarted = false;
        this.cancelElt.innerHTML = "<button>Annuler</button>";
    },

    decreaseTimer: function() {
        if (this.counter > 1) {
            this.counter = this.counter - 1;
            this.formatTimer();
        } else {
            clearInterval(this.intervalId); // clears a timer set with the setInterval() method
            this.textTimerElt.textContent = "Votre réservation a expiré";
            this.resetTimer(); 
        }
    },

    formatTimer: function() {
        var minutes = Math.trunc(this.counter / 60); // Math.trunc : the number is rounded to the nearest integer to zero // Calculate the number of minutes based on the number of seconds remaining
        var seconds = this.counter % 60; // % : modulus operator who returns the division remainder
        this.textTimerElt.innerHTML = "Vélo réservé à la station ____ par_____ <br/> Temps restant : " + minutes + "min et " + seconds +"s"; 
    },

    resetTimer: function() { // reactive the reservation button and restrarts the counter
        this.clearSignature.removeAttribute("disabled");
        this.counter = this.selectedDuration;
    }
    };
    
   





    

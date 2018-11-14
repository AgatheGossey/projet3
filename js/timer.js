var timer = {

    init: function(timerId, duration) {
        this.timer = document.getElementById(timerId);
        this.selectedDuration = duration;
        this.button = document.getElementById("buttonReservation");
        this.textTimerElt = document.getElementById("textTimer");
        this.counter = duration; // number of seconds in 20 minutes
        this.addListeners();
    },
    
    addListeners: function() {
        document.getElementById("buttonReservation").addEventListener("click", this.startTimer.bind(this));
    },
    
    startTimer: function () {
        this.intervalId = setInterval(this.decreaseTimer.bind(this), 1000); // call the "decreaseTimer" function repeatedly, with a delay set at 1000 milliseconds
        this.button.setAttribute("disabled", true); // disable the reservation button
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
        this.textTimerElt.textContent = "Temps restant : " + minutes + "min et " + seconds +"s"; 
    },

    resetTimer: function() { // reactive the reservation button and restrarts the counter
        this.button.removeAttribute("disabled");
        this.counter = this.selectedDuration;
    }

    };
    
   





    



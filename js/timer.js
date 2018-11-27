var timer = {

    init: function(timerId, duration) {
        this.timer = document.getElementById(timerId);
        this.selectedDuration = duration;
        this.clearSignature = document.getElementById("clearSignatureButton");
        this.counter = duration; // number of seconds in 20 minutes
        this.isStarted = false;
    },
    
    startTimer: function () {
        this.isStarted = true;
        this.intervalId = setInterval(this.decreaseTimer.bind(this), 1000); // call the "decreaseTimer" function repeatedly, with a delay set at 1000 milliseconds
    },
    
    decreaseTimer: function() {
        if (this.counter > 1) {
            this.counter = this.counter - 1;
            this.formatTimer();
        } else {
            clearInterval(this.intervalId); // clears a timer set with the setInterval() method
            this.timer.textContent = "Votre réservation a expiré";
            this.resetTimer(); 
        }
    },

    formatTimer: function() {
        this.minutes = Math.trunc(this.counter / 60); // Math.trunc : the number is rounded to the nearest integer to zero // Calculate the number of minutes based on the number of seconds remaining
        this.seconds = this.counter % 60; // % : modulus operator who returns the division remainder
        this.timer.innerHTML = "Temps restant : " + this.minutes + "min et " + this.seconds +"s"; 
    },

    resetTimer: function() { // reactive the reservation button and restrarts the counter
        this.counter = this.selectedDuration;
        clearInterval(this.intervalId);
        this.timer.textContent = "";
    }
    };
    
   





    

var timer = {

    init: function(timerId) {
        this.timer = document.getElementById(timerId);
        this.button = document.getElementById("buttonReservation");
        this.textTimerElt = document.getElementById("textTimer");
        this.counter = 1200;
        this.addListeners();
    },
    
    addListeners: function() {
        document.getElementById("buttonReservation").addEventListener("click", this.startTimer.bind(this));
    },
    
    startTimer: function () {
        this.intervalId = setInterval(this.decreaseTimer.bind(this), 1000);
        this.button.setAttribute("disabled", true);
    },
    
    decreaseTimer: function() {
        if (this.counter > 1) {
            this.counter = this.counter - 1;
            this.formatTimer();
        } else {
            clearInterval(this.intervalId);
            this.textTimerElt.textContent = "Votre réservation a expiré";
            this.resetTimer();
        }
    },

    formatTimer: function() {
        var minutes = Math.trunc(this.counter / 60);
        var seconds = this.counter % 60;
        this.textTimerElt.textContent = "Temps restant : " + minutes + "min et " + seconds +"s";
    },

    resetTimer: function() {
        this.button.removeAttribute("disabled");
        this.counter = 1200;
    }

    };
    
   





    



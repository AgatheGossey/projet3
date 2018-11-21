// Make a call AJAX GET

// Takes into parameters the URL and callback function called on success
function ajaxGet(url, callback) {
    // Create an HTTP request
    var req = new XMLHttpRequest();
    req.open("GET", url); // Asynchronous HTTP GET request to URL
    // Creating the event indicating the end of the request
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) { // The server has successfully processed the request
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText); // View information about failed request processing
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url); // The request failed to reach the server + url 
    });
    req.send(null);
    }


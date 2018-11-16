// CODE GENERIQUE 
// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès 
function ajaxGet(url, callback) {
    // Création d'une requête HTTP
    var req = new XMLHttpRequest();
    req.open("GET", url); //// Requête HTTP GET asynchrone vers l'URL
    // Gestion de l'événement indiquant la fin de la requête
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) { // Le serveur a réussi à traiter la requête
            callback(req.responseText);
        } else {

            console.error(req.status + " " + req.statusText); // Affichage des informations sur l'échec du traitement de la requête
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url); // La requête n'a pas réussi à atteindre le serveur
    });
    req.send(null);
    }


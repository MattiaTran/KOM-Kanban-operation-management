const form = document.getElementById("kanban-board");
const inputTitolo = document.getElementById("titolo");
const inputPriorita = document.getElementById("priorita");
const inputOperatore = document.getElementById("operatore");
const filtro = document.getElementById("filtro");
const pulsanteReset = document.getElementById("reset");
 
const stati = ["da-fare", "in-corso", "completata"];
 
let attivita = JSON.parse(localStorage.getItem("attivita")) || [];
 
function salvaAttivita() {
    localStorage.setItem("attivita", JSON.stringify(attività));
}

form.addEventListener("submit", gestisciSubmit);


function gestisciSubmit(event) {
    event.preventDefault();
 
    const titolo = inputTitolo.value.trim();
    const priorita = inputPriorita.value;
    const operatore = inputOperatore.value.trim();
 
    if (titolo === "" || operatore === "") {
        alert("Inserisci il titolo e l'operatore!");
        return;
    }
 
    const nuovaAttivita = {
        id: Date.now(),
        titolo: titolo,
        priorita: priorita,
        operatore: operatore,
        stato: "da-fare"
    };
 
    attivita.push(nuovaAttivita);
 
    salvaAttivita();
    mostraAttivita();
 
    form.reset();
}
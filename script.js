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


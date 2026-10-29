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


function mostraAttivita() {
    for (let i = 0; i < stati.length; i++) {
        document.getElementById(stati[i]).innerHTML = "";
    }
 
    const prioritaScelta = filtro.value;
 
    for (let i = 0; i < attivita.length; i++) {
        const task = attivita[i];
 
        if (prioritaScelta !== "tutte" && task.priorita !== prioritaScelta) {
            continue;
        }
 
        const scheda = document.createElement("div");
        scheda.className = "scheda";
 
        const titolo = document.createElement("h3");
        titolo.textContent = task.titolo;
 
        const priorita = document.createElement("p");
        priorita.textContent = "Priorità: " + task.priorita;
 
        const operatore = document.createElement("p");
        operatore.textContent = "Operatore: " + task.operatore;
 
        //pulsante torna indietro
        const indietro = document.createElement("button");
        indietro.textContent = "←";
        indietro.type = "button";
        indietro.disabled = task.stato == "da-fare";
        indietro.addEventListener("click", function() {
            spostaAttivita(task.id, -1);
        });
 
        //pulsante avanza stato
        const avanti = document.createElement("button");
        avanti.textContent = "→";
        avanti.type == "button";
        avanti.disabled = task.stato == "completata";
        avanti.addEventListener("click", function() {
            spostaAttivita(task.id, 1);
        });
 
        //pulsante elimina attivita
        const elimina = document.createElement("button");
        elimina.textContent = "Elimina";
        elimina.type = "button";
        elimina.addEventListener("click", function() {
            eliminaAttivita(task.id);
        });
 
        scheda.appendChild(titolo);
        scheda.appendChild(priorita);
        scheda.appendChild(operatore);
        scheda.appendChild(indietro);
        scheda.appendChild(avanti);
        scheda.appendChild(elimina);
 
        document.getElementById(task.stato).appendChild(scheda);
    }
 
    aggiornaContatori();
}
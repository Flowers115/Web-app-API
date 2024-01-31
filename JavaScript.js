function getData() {
  const container = document.getElementById("container-list"); //serve a creare la variabile in container-list tramite id in modo che il risultato della funzione venga inserito li
  container.innerHTML = ''; //serve a svuotare l'elenco quando si cambia categoria (e quindi valore)
  // CONTROLLO SE E SELEZIONATO FANTASY
  var categ = document.getElementById("inputGroupSelect01").value; //codice per selezionare l'opzione nel menu a tendina
  if (categ == "2") // il valore che ho dato a fantasy
  {
    fetch('https://openlibrary.org/subjects/fantasy.json')
      .then(result => result.json())
      .then(data => {
        container.innerHTML = '';
        data.works.forEach(work => {
          const listItem = document.createElement("li");
          var bottonetitolo = '<button class="btn btn-xs btn-info mx-1 my-1" onclick="getInfo(\'' + work.key + '\')">' + work.title + '</button>'; //così ho creato un bottone nella lista dei titoli con all'interno il titolo del libro e fuori l'autore e quando ci clicco contiene la key del libro.
          listItem.innerHTML = bottonetitolo + `- ${work.authors[0].name}`;
          container.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }
}

var desccard = document.getElementById("description");

function getInfo(k) {
   //creo variabile in description per alloggiare la descrizione.
  desccard.innerHTML = ''; //svuota "description" dalla descrizione del precedente libro

  fetch('https://openlibrary.org' + k + '.json')
    .then(result => result.json()) //il risultato lo converte in json
    .then(data => {
      desccard.innerHTML = '';
      const trama = document.createElement("p");
      trama.innerHTML = data.description;
      desccard.appendChild(trama);
      console.log(typeof data.description);
      if (data.description != '' && (typeof data.description === 'string')) {
        desccard.classList.remove("hidden");
      } else {
      console.log("hidden");
        desccard.classList.add("hidden");
      }
    })
}




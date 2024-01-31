# Web-app Education (Read More)

Questo progetto è stato realizzato per incentivare la lettura dei libri tramite una app la quale, una volta selezionato il genere, restituisce tutti i titoli corrispondenti e la loro trama.


## Screenshots

![App Screenshot](https://github.com/Flowers115/Web-app-API/blob/main/Screenshot/Screenshot%202024-01-31%20alle%2017.36.18.png)


## Implementazione progetto
Per realizzare il progetto è stata creata una barra di ricerca per genere che si apre a tendina e un button per l'avvio della ricerca secondo il genere scelto.
```html

<div class="d-flex justify-content-end grid gap-5 column-gap-3">
    <div class="col-sm-2 mt-4">
        <select class="form-select" id="inputGroupSelect01">
        <option selected>Category</option>
        <option value="1">Drama</option>
        <option value="2">Fantasy</option>
        <option value="3">Horror</option>
        </select>
    </div>
    <div class="col-sm-5 mt-4">
        <button class="btn btn-primary" id="Search" onclick="getData()">
            Search
        </button>
    </div>
</div>
```

Una volta che si preme il button, la app invia una richiesta API al sito Openlibrary che restituisce tutti i libri del genere selezionato.
Inoltre, se si clicca sul titolo di un libro, la app fa una seconda richiesta API al sito, che restituisce la descrizione del libro.

ed in seguito sviluppati in JavaScript: 
```javascript

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
```

Ho creato la funzione getData per richiedere tramire API al sito Openlibrary la lista dei libri per il genere selezionato.
Ho fatto in modo che stessero tutti in un container (container-list) e che questo contenitore si svuoti ad ogni nuova richiesta per far spazio soltanto a quella nuova.
All'interno del "titolo + autore" risultante dopo la richiesta, ho inserito anche la key univoca del libro, in modo che la funzione getInfo possa restituire la descrizione del libro in base alla key.

## GitHub Link  
Il progetto è disponibile al seguente link: https://github.com/Flowers115/Web-app-API
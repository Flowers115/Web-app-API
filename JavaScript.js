function getData() {
  const container = document.getElementById("container-list");
  // Utilizzo di Lodash per svuotare l'HTML
  _.set(container, 'innerHTML', '');

  var categ = document.getElementById("inputGroupSelect01").value;

  if (categ == "2") {
    fetch('https://openlibrary.org/subjects/fantasy.json')
      .then(result => result.json())
      .then(data => {
        _.set(container, 'innerHTML', '');
        _.forEach(data.works, (work) => {
          const listItem = document.createElement("li");
          var bottonetitolo = `<button class="btn btn-xs btn-info mx-1 my-1" onclick="getInfo('${work.key}')">${work.title}</button>`; // Template literals per migliorare la leggibilità
          listItem.innerHTML = bottonetitolo + `- ${_.get(work, 'authors[0].name', 'Unknown Author')}`; // Gestione di autori sconosciuti
          container.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }
}

var desccard = document.getElementById("description");

function getInfo(k) {
  _.set(desccard, 'innerHTML', ''); // Utilizzo di Lodash per svuotare l'HTML

  fetch(`https://openlibrary.org${k}.json`)
    .then(result => result.json())
    .then(data => {
      _.set(desccard, 'innerHTML', '');
      const trama = document.createElement("p");
      trama.innerHTML = _.get(data, 'description.value', _.get(data, 'description', 'No description available.')); // Gestione di descrizioni complesse o mancanti
      desccard.appendChild(trama);
      if (!_.isEmpty(data.description) && _.isString(data.description)) {
        desccard.classList.remove("hidden");
      } else {
        console.log("hidden");
        alert("Questa Descrizione non è disponibile. Ci scusiamo per il disagio.")
        desccard.classList.add("hidden");
      }
    })
    .catch(error => {
      console.error('Errore:', error);
      desccard.innerHTML = 'Errore.';
      desccard.classList.remove("hidden");
    });
}
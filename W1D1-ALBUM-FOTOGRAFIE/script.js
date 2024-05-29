// Aggiunge un event listener per il click sul bottone "Luna"
// Al click, esegue la funzione fetchPhotos con il termine di ricerca 'luna' e tipo 'foto'
document.getElementById('btn-luna').addEventListener('click', () => fetchPhotos('luna', 'foto'));

// Aggiunge un event listener per il click sul bottone "Programmazione"
// Al click, esegue la funzione fetchPhotos con il termine di ricerca 'programming' e tipo 'foto'
document.getElementById('btn-programmazione').addEventListener('click', () => fetchPhotos('programming', 'foto'));

// Aggiunge un event listener per il click sul bottone di ricerca "Cerca"
// Al click, prende il valore dell'input di ricerca e del select tipo
document.getElementById('search-btn').addEventListener('click', () => {
  const query = document.getElementById('search-input').value; // Prende il valore dell'input di ricerca
  const type = document.getElementById('tipologia').value; // Prende il valore del select tipo

  // Controlla se il tipo selezionato è 'foto'
  if (type === 'foto') {
    // Chiama la funzione fetchPhotos con il termine di ricerca e tipo 'foto'
    fetchPhotos(query, type);
  } 
  // Controlla se il tipo selezionato è 'video'
  else if (type === 'video') {
    // Chiama la funzione fetchVideos con il termine di ricerca
    fetchVideos(query);
  }
});

// Funzione per eseguire la ricerca delle foto tramite l'API di Pexels
function fetchPhotos(query, type) {
  console.log(`Fetching ${type} for query: ${query}`); // Log del tipo di contenuto e termine di ricerca

  // Esegue una richiesta fetch all'API di Pexels con il termine di ricerca x le foto
  fetch(`https://api.pexels.com/v1/search?query=${query}`, {
    headers: {
      'Authorization': 'RMkuFXCaoLUwqcF4BdegBLSKjcG45iMO6VALTUrDImXPfaL0Ge8R2RWG' // Header di autorizzazione con la chiave API
    }
  })
  .then(response => {
    console.log('Response:', response); // Log della risposta
    return response.json(); // Converte la risposta in formato JSON
  })
  .then(data => {
    console.log('Data:', data); // Log dei dati ricevuti
    const gallery = document.getElementById('gallery'); // Prende l'elemento con id 'gallery'
    gallery.innerHTML = ''; // Svuota il contenuto della galleria

    // Itera su ogni foto ricevuta dai dati
    data.photos.map(photo => {
      console.log('Photo:', photo); // Log della singola foto

      const col = document.createElement('div'); // Crea un nuovo elemento div
      col.className = 'col-md-4 mb-4'; // Assegna le classi Bootstrap per la colonna e il margine

      const img = document.createElement('img'); // Crea un nuovo elemento img
      img.src = photo.src.medium; // Imposta l'attributo src dell'immagine
      img.alt = photo.alt; // Imposta l'attributo alt dell'immagine
      img.className = 'img-fluid media'; // Assegna la classe Bootstrap per l'immagine responsive e la classe media x richiamare css con grandezza e cover per tutti

      col.appendChild(img); // Aggiunge l'immagine al div colonna
      gallery.appendChild(col); // Aggiunge il div colonna alla galleria
    });
  })
  .catch(error => console.error('Error fetching photos:', error)); // Log degli errori nella richiesta fetch
}

// Funzione per eseguire la ricerca dei video tramite l'API di Pexels
function fetchVideos(query) {
  console.log(`Fetching videos for query: ${query}`); // Log del termine di ricerca

  // Esegue una richiesta fetch all'API di Pexels con il termine di ricerca x i video
  fetch(`https://api.pexels.com/videos/search?query=${query}`, {
    headers: {
      'Authorization': 'RMkuFXCaoLUwqcF4BdegBLSKjcG45iMO6VALTUrDImXPfaL0Ge8R2RWG' // Header di autorizzazione con la chiave API
    }
  })
  .then(response => {
    console.log('Response:', response); // Log della risposta
    return response.json(); // Converte la risposta in formato JSON
  })
  .then(data => {
    console.log('Data:', data); // Log dei dati ricevuti
    const gallery = document.getElementById('gallery'); // Prende l'elemento con id 'gallery'
    gallery.innerHTML = ''; // Svuota il contenuto della galleria

    // Itera su ogni video ricevuto dai dati
    data.videos.map(video => {
      console.log('Video:', video); // Log del singolo video

      const col = document.createElement('div'); // Crea un nuovo elemento div
      col.className = 'col-md-4 mb-4'; // Assegna le classi Bootstrap per la colonna e il margine

      const videoElement = document.createElement('video'); // Crea un nuovo elemento video
      videoElement.src = video.video_files[0].link; // Imposta l'attributo src del video
      videoElement.controls = true; // Aggiunge i controlli al video
      videoElement.className = 'img-fluid media'; // Assegna la classe Bootstrap per il video responsive e la classe media x richiamare css con grandezza e cover per tutti

      col.appendChild(videoElement); // Aggiunge il video al div colonna
      gallery.appendChild(col); // Aggiunge il div colonna alla galleria
    });
  })
  .catch(error => console.error('Error fetching videos:', error)); // Log degli errori nella richiesta fetch
}

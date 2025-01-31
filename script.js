// Firebase-Konfiguration einfügen (ersetze die Platzhalter mit deinen Firebase-Daten)
const firebaseConfig = {
  apiKey: "AIzaSyCfFrvGZ2esnAuDRhj1SG8XfcG0G3N5zF8",
  authDomain: "schafe-df870.firebaseapp.com",
  databaseURL: "https://schafe-df870-default-rtdb.firebaseio.com",
  projectId: "schafe-df870",
  storageBucket: "schafe-df870.firebasestorage.app",
  messagingSenderId: "741265220339",
  appId: "1:741265220339:web:3a0b7c4d12cb9dcab80d86"
  
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

// Elemente aus dem DOM holen
const sheepCountInput = document.getElementById('sheepCount');
const submitButton = document.getElementById('submitButton');
const leaderboardList = document.getElementById('leaderboard');
const stackContainer = document.querySelector('.stack-container');

// Leaderboard aus der Datenbank abrufen und anzeigen
function updateLeaderboard() {
  database.ref('leaderboard').orderByChild('count').limitToLast(10).on('value', (snapshot) => {
    leaderboardList.innerHTML = ''; // Liste leeren
    const data = snapshot.val();
    if (data) {
      const sortedEntries = Object.values(data).sort((a, b) => b.count - a.count); // Nach Anzahl sortieren
      sortedEntries.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = ${index + 1}. ${entry.name}: ${entry.count} Schafe;
        leaderboardList.appendChild(li);
      });
    }
  });
}

// Visuelle Darstellung der gestapelten Stoffbälle aktualisieren
function updateSheepStack(count) {
  stackContainer.innerHTML = ''; // Vorherige Stoffbälle löschen
  for (let i = 0; i < count; i++) {
    const sheepBall = document.createElement('div');
    sheepBall.classList.add('sheep-ball');
    stackContainer.appendChild(sheepBall);
  }
}

// Eintrag hinzufügen
submitButton.addEventListener('click', () => {
  const count = parseInt(sheepCountInput.value);
  if (isNaN(count) || count < 0) {
    alert('Bitte gib eine gültige Anzahl ein.');
    return;
  }

  const name = prompt('Wie heißt du?'); // Namen abfragen
  if (!name) return;

  // Eintrag in die Datenbank speichern
  const newEntry = { name, count };
  database.ref('leaderboard').push(newEntry);

  updateSheepStack(count); // Visuelle Darstellung aktualisieren
  sheepCountInput.value = ''; // Eingabefeld le

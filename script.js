// Leaderboard-Daten aus dem Local Storage laden oder initialisieren
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

// Elemente aus dem DOM holen
const sheepCountInput = document.getElementById('sheepCount');
const submitButton = document.getElementById('submitButton');
const leaderboardList = document.getElementById('leaderboard');

// Leaderboard anzeigen
function updateLeaderboard() {
  leaderboardList.innerHTML = ''; // Liste leeren
  leaderboard.sort((a, b) => b.count - a.count); // Nach Anzahl sortieren
  leaderboard.forEach((entry, index) => {
    const li = document.createElement('li');
    li.textContent = ${index + 1}. ${entry.name}: ${entry.count} Schafe;
    leaderboardList.appendChild(li);
  });
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

  leaderboard.push({ name, count }); // Eintrag hinzufügen
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard)); // Speichern
  updateLeaderboard(); // Leaderboard aktualisieren
  sheepCountInput.value = ''; // Eingabefeld leeren
});

// Initiales Laden des Leaderboards
updateLeaderboard();
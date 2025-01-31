

// Firebase initialisieren
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();







import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCfFrvGZ2esnAuDRhj1SG8XfcG0G3N5zF8",

  authDomain: "schafe-df870.firebaseapp.com",

  databaseURL: "https://schafe-df870-default-rtdb.firebaseio.com",

  projectId: "schafe-df870",

  storageBucket: "schafe-df870.firebasestorage.app",

  messagingSenderId: "741265220339",

  appId: "1:741265220339:web:3a0b7c4d12cb9dcab80d86",

  measurementId: "G-828WEWWYC8"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);









// DOM-Elemente
const sheepCountInput = document.getElementById('sheepCount');
const submitButton = document.getElementById('submitButton');
const leaderboardList = document.getElementById('leaderboard');
const stackContainer = document.querySelector('.stack-container');

// Leaderboard aktualisieren
function updateLeaderboard() {
  database.ref('leaderboard').orderByChild('count').limitToLast(10).on('value', (snapshot) => {
    leaderboardList.innerHTML = '';
    const data = snapshot.val();
    if (data) {
      const sortedEntries = Object.values(data).sort((a, b) => b.count - a.count);
      sortedEntries.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = ${index + 1}. ${entry.name}: ${entry.count} Schafe;
        leaderboardList.appendChild(li);
      });
    }
  });
}

// Stoffbälle anzeigen
function updateSheepStack(count) {
  stackContainer.innerHTML = '';
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

  const name = prompt('Wie heißt du?');
  if (!name) return;

  const newEntry = { name, count };
  database.ref('leaderboard').push(newEntry);

  updateSheepStack(count);
  sheepCountInput.value = '';
});

// Initialisierung
updateLeaderboard();
updateSheepStack(0);

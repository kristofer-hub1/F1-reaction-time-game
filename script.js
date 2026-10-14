// --- 1. MÄNGU MUUTUJAD (const & let) ---
const TOTAL_ATTEMPTS = 3;
let currentAttempt = 1;
let attemptTimes = [];
let gameState = 'IDLE'; // Olekud: 'IDLE', 'COUNTDOWN', 'READY', 'FINISHED'

let startTime = 0;
let reactionTime = 0;
let lightSequenceTimer = null;
let goTimer = null;
let soundEnabled = true;

// Isiklik rekord brauseri kohalikust mälust (localStorage)
let personalBest = localStorage.getItem('f1_pb') ? parseInt(localStorage.getItem('f1_pb')) : null;

// Audio kontekst
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

// --- 2. ELEMENTIDE LEIDMINE DOM-ist ---
const statusMessage = document.getElementById('statusMessage');
const mainBtn = document.getElementById('mainBtn');
const attemptDisplay = document.getElementById('attemptDisplay');
const lastTimeDisplay = document.getElementById('lastTimeDisplay');
const pbDisplay = document.getElementById('pbDisplay');
const resultsModal = document.getElementById('resultsModal');
const soundToggleBtn = document.getElementById('soundToggleBtn');
const soundIcon = document.getElementById('soundIcon');

// Alglaadimine
window.onload = () => {
  updatePBDisplay();
};

// --- 3. HELI FUNKTSIOONID (Web Audio API) ---
function initAudio() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
}

function playBeep(freq = 440, duration = 0.1, type = 'sine') {
  if (!soundEnabled) return;
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.log("Heli viga:", e);
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    soundIcon.className = "fas fa-volume-up text-cyan";
  } else {
    soundIcon.className = "fas fa-volume-mute";
  }
}

// --- 4. PEAMISED LOOGIKAFUNKTSIOONID ---

// Funktsioon A: Sisendi hallatav peafunktsioon
function handleInteraction() {
  initAudio();

  if (gameState === 'IDLE') {
    startSequence();
  } else if (gameState === 'COUNTDOWN') {
    handleFalseStart();
  } else if (gameState === 'READY') {
    recordReaction();
  } else if (gameState === 'FINISHED') {
    startSequence();
  }
}

// Funktsioon B: Stardiprotsessi alustamine
function startSequence() {
  gameState = 'COUNTDOWN';
  resetLights();

  statusMessage.textContent = 'VALMISTU...';
  statusMessage.style.color = 'var(--f1-yellow)';

  mainBtn.innerHTML = '<i class="fas fa-hand"></i> OOTA ROHELIST!';
  mainBtn.classList.remove('btn-go');

  let currentPost = 1;

  // Süüta tuled järjestikku 1-sekundilise vahega
  lightSequenceTimer = setInterval(() => {
    if (currentPost <= 5) {
      setPostRed(currentPost);
      playBeep(520, 0.15, 'square');
      currentPost++;
    } else {
      clearInterval(lightSequenceTimer);

      // Juhuslik ooteaeg 1.5 kuni 4.5 sekundit
      const randomDelay = Math.floor(Math.random() * 3000) + 1500;
      goTimer = setTimeout(triggerGo, randomDelay);
    }
  }, 1000);
}

// Funktsioon C: Rohelise tule / Start signaal
function triggerGo() {
  gameState = 'READY';
  startTime = performance.now();

  setAllGreen();
  playBeep(880, 0.3, 'sine');

  statusMessage.textContent = 'SÕIDA! VAJUTA NÜÜD!';
  statusMessage.style.color = 'var(--f1-green)';

  mainBtn.innerHTML = '<i class="fas fa-bolt"></i> VAJUTA NÜÜD!';
  mainBtn.classList.add('btn-go');
}

// Funktsioon D: Reaktsiooni salvestamine
function recordReaction() {
  const endTime = performance.now();
  reactionTime = Math.round(endTime - startTime);

  gameState = 'IDLE';
  attemptTimes.push(reactionTime);

  // Isikliku rekordi kontroll
  if (!personalBest || reactionTime < personalBest) {
    personalBest = reactionTime;
    localStorage.setItem('f1_pb', personalBest);
    updatePBDisplay();
  }

  playBeep(1000, 0.2, 'sine');

  // UI Uuendamine
  document.getElementById(`attempt${currentAttempt}Text`).textContent = `${reactionTime} ms`;
  lastTimeDisplay.textContent = `${reactionTime} ms`;

  statusMessage.textContent = `Aeg: ${reactionTime} ms!`;
  statusMessage.style.color = '#ffffff';

  if (currentAttempt < TOTAL_ATTEMPTS) {
    currentAttempt++;
    attemptDisplay.textContent = `${currentAttempt} / ${TOTAL_ATTEMPTS}`;
    mainBtn.innerHTML = `<i class="fas fa-play"></i> JÄRGMINE KATSE (${currentAttempt}/${TOTAL_ATTEMPTS})`;
    mainBtn.classList.remove('btn-go');
  } else {
    finishTournament();
  }
}

// Funktsioon E: Valestardi tuvastamine (If/Else laused ja karistus)
function handleFalseStart() {
  clearInterval(lightSequenceTimer);
  clearTimeout(goTimer);
  gameState = 'IDLE';

  playBeep(180, 0.4, 'sawtooth');

  statusMessage.textContent = 'VALESTART! Liiga vara!';
  statusMessage.style.color = 'var(--f1-red)';

  const card = document.querySelector('.game-card');
  card.classList.add('animate-shake');
  setTimeout(() => card.classList.remove('animate-shake'), 500);

  mainBtn.innerHTML = '<i class="fas fa-redo"></i> PROOVI UUESTI KATSET';
  mainBtn.classList.remove('btn-go');

  resetLights();
}

// Funktsioon F: Turniiri lõpetamine ja analüüs
function finishTournament() {
  gameState = 'FINISHED';

  const bestTime = Math.min(...attemptTimes);
  const avgTime = Math.round(attemptTimes.reduce((a, b) => a + b, 0) / attemptTimes.length);

  // Driver Ranking loogika (Tingimuslause / Conditional)
  let rating = '';
  if (bestTime < 200) {
    rating = '⚡ MAX VERSTAPPEN TASE!';
  } else if (bestTime < 240) {
    rating = '🏎️ F1 TEGEVSÕITJA';
  } else if (bestTime < 280) {
    rating = '🏁 F2 PRO-SÕITJA';
  } else if (bestTime < 330) {
    rating = '🏎️ KARTINGU MEISTER';
  } else {
    rating = '🚗 TAVASÕITJA';
  }

  document.getElementById('modalBest').textContent = `${bestTime} ms`;
  document.getElementById('modalAvg').textContent = `${avgTime} ms`;
  document.getElementById('driverRating').textContent = rating;

  resultsModal.classList.remove('hidden');
}

// Funktsioon G: Turniiri taaskäivitamine
function resetTournament() {
  currentAttempt = 1;
  attemptTimes = [];
  gameState = 'IDLE';

  attemptDisplay.textContent = `1 / ${TOTAL_ATTEMPTS}`;
  lastTimeDisplay.textContent = '--- ms';
  document.getElementById('attempt1Text').textContent = '--';
  document.getElementById('attempt2Text').textContent = '--';
  document.getElementById('attempt3Text').textContent = '--';

  resultsModal.classList.add('hidden');
  resetLights();

  statusMessage.textContent = 'Vajuta nuppu või tühikuklahvi!';
  statusMessage.style.color = '#ffffff';

  mainBtn.innerHTML = '<i class="fas fa-play"></i> ALUSTA STARDIPROTSESSI';
  mainBtn.classList.remove('btn-go');
}

// --- 5. ABOFUNKTSIOONID JA SÜNDMUSED (Event Listeners) ---

function resetLights() {
  for (let p = 1; p <= 5; p++) {
    document.getElementById(`p${p}-1`).className = "light";
    document.getElementById(`p${p}-2`).className = "light";
  }
}

function setPostRed(postNum) {
  document.getElementById(`p${postNum}-1`).className = "light light-red";
  document.getElementById(`p${postNum}-2`).className = "light light-red";
}

function setAllGreen() {
  for (let p = 1; p <= 5; p++) {
    document.getElementById(`p${p}-1`).className = "light light-green";
    document.getElementById(`p${p}-2`).className = "light light-green";
  }
}

function updatePBDisplay() {
  pbDisplay.textContent = personalBest ? `${personalBest} ms` : '--- ms';
}

// Sündmuste kuulajad (Nupuvajutused ja Tühikuklahv)
mainBtn.addEventListener('click', handleInteraction);
soundToggleBtn.addEventListener('click', toggleSound);
document.getElementById('modalResetBtn').addEventListener('click', resetTournament);

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault(); // Takistab lehe kerimist tühikuga
    handleInteraction();
  }
});
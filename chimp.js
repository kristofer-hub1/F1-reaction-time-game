// DOM Elemendid
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const gridContainer = document.getElementById('gridContainer');

const levelDisplay = document.getElementById('levelDisplay');
const livesDisplay = document.getElementById('livesDisplay');
const finalScore = document.getElementById('finalScore');

const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

// Mängu seaded
const MAX_LEVEL = 20;
const GRID_COLS = 8;
const GRID_ROWS = 5;
const TOTAL_CELLS = GRID_COLS * GRID_ROWS;

// Mängu olek
let currentLevel = 1;
let lives = 3;
let currentNumberToClick = 1;
let maxNumbersForLevel = 4; // LVL 1 algab 4 numbriga
let isSequenceHidden = false;
let activeTiles = [];

// Ekraanide vahetamine
function showScreen(screen) {
  startScreen.classList.remove('active');
  gameScreen.classList.remove('active');
  gameOverScreen.classList.remove('active');
  screen.classList.add('active');
}

// Genereeri unikaalsed positsioonid ruudustikus
function generateRandomPositions(count) {
  const positions = [];
  while (positions.length < count) {
    const randomPos = Math.floor(Math.random() * TOTAL_CELLS);
    if (!positions.includes(randomPos)) {
      positions.push(randomPos);
    }
  }
  return positions;
}

// Lae uus tase
function loadLevel() {
  currentNumberToClick = 1;
  isSequenceHidden = false;
  maxNumbersForLevel = 3 + currentLevel; // LVL 1 = 4 nri, LVL 2 = 5 nri jne.
  
  levelDisplay.textContent = currentLevel;
  gridContainer.innerHTML = '';
  activeTiles = [];

  const positions = generateRandomPositions(maxNumbersForLevel);

  // Loo ruudustik
  for (let i = 0; i < TOTAL_CELLS; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.index = i;

    // Kui sellel indeksil peab olema number
    const posIndex = positions.indexOf(i);
    if (posIndex !== -1) {
      const actualNumber = posIndex + 1;
      tile.textContent = actualNumber;
      tile.dataset.number = actualNumber;
      tile.classList.add('active');
      
      tile.addEventListener('click', () => handleTileClick(tile, actualNumber));
      activeTiles.push(tile);
    }

    gridContainer.appendChild(tile);
  }
}

// Ploki klõpsamise loogika
function handleTileClick(tile, number) {
  if (!tile.classList.contains('active')) return;

  // Õige number!
  if (number === currentNumberToClick) {
    
    // Kui klõpsati numbril 1, peida ülejäänud
    if (number === 1 && currentLevel > 1) { // Tase 1 võib jätta numbrid nähtavaks, aga teeme klassikalise
      hideNumbers();
    }

    // Märgi see klots lahendatuks
    tile.classList.remove('active');
    tile.classList.remove('hidden-num');
    tile.classList.add('revealed');
    
    currentNumberToClick++;

    // Kui kõik numbrid leitud, mine järgmisele tasemele
    if (currentNumberToClick > maxNumbersForLevel) {
      setTimeout(() => {
        if (currentLevel >= MAX_LEVEL) {
          endGame(true); // Võit
        } else {
          currentLevel++;
          loadLevel();
        }
      }, 500);
    }
  } 
  // Vale number
  else {
    lives--;
    livesDisplay.textContent = lives;
    
    if (lives <= 0) {
      endGame(false);
    } else {
      // Näita punast tausta veateateks korraks
      document.querySelector('.hud-frame').style.boxShadow = "0 0 40px #ff0055";
      setTimeout(() => {
        document.querySelector('.hud-frame').style.boxShadow = "0 0 40px rgba(0, 240, 255, 0.1)";
        loadLevel(); // Lae tase uuesti
      }, 500);
    }
  }
}

// Peida kõik järelejäänud numbrid
function hideNumbers() {
  isSequenceHidden = true;
  activeTiles.forEach(tile => {
    if (tile.classList.contains('active')) {
      tile.classList.add('hidden-num');
    }
  });
}

// Mängu lõpp (kaotus või võit)
function endGame(isWin) {
  showScreen(gameOverScreen);
  if (isWin) {
    document.querySelector('#gameOverScreen h2').textContent = "MÄLU MAKSIMEERITUD";
    document.querySelector('#gameOverScreen h2').className = "text-cyan";
  } else {
    document.querySelector('#gameOverScreen h2').textContent = "SÜSTEEMI VIGA";
    document.querySelector('#gameOverScreen h2').className = "text-red";
  }
  finalScore.textContent = currentLevel;
}

// Nuppude sündmused
startBtn.addEventListener('click', () => {
  currentLevel = 1;
  lives = 3;
  livesDisplay.textContent = lives;
  showScreen(gameScreen);
  loadLevel();
});

restartBtn.addEventListener('click', () => {
  currentLevel = 1;
  lives = 3;
  livesDisplay.textContent = lives;
  showScreen(gameScreen);
  loadLevel();
});
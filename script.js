const symbols = ["🍎", "🍌", "🍇", "🍒", "🍍", "🥝"];
let cards = [...symbols, ...symbols];

cards.sort(() => 0.5 - Math.random());

const board = document.getElementById("gameBoard");

// score
const movesDisplay = document.getElementById("moves");
const feedback = document.getElementById("feedback");

// timer
const timerDisplay = document.getElementById("timer");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;

// ⏱️ timer
let time = 0;
let timerStarted = false;
let timerInterval = null;

// 🧱 création cartes
cards.forEach(symbol => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.symbol = symbol;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">?</div>
      <div class="card-back">${symbol}</div>
    </div>
  `;

  card.addEventListener("click", flipCard);

  board.appendChild(card);
});

// 🔄 flip
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  // ⏱️ start timer au 1er coup
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;

  checkMatch();
}

// 🧠 check match + score
function checkMatch() {
  moves++;
  movesDisplay.textContent = moves;

  const isMatch =
    firstCard.dataset.symbol === secondCard.dataset.symbol;

  isMatch ? disableCards() : unflipCards();

  updateFeedback();
}

// ✅ match
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();

  checkWin();
}

// ❌ pas match
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 900);
}

// 🔁 reset
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// 📊 feedback joueur
function updateFeedback() {
  if (moves <= 10) {
    feedback.textContent = "🔥 Excellent !";
    feedback.style.color = "lightgreen";
  } 
  else if (moves <= 20) {
    feedback.textContent = "👍 Bien joué !";
    feedback.style.color = "orange";
  } 
  else {
    feedback.textContent = "😅 Tu peux t'améliorer !";
    feedback.style.color = "red";
  }
}

// ⏱️ démarrer timer
function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    timerDisplay.textContent = time;
  }, 1000);
}

// 🏆 victoire + arrêt timer
function checkWin() {
  const allCards = document.querySelectorAll(".card");

  const matchedCards = document.querySelectorAll(".card.flip");

  if (matchedCards.length === allCards.length) {
    clearInterval(timerInterval);

    setTimeout(() => {
      alert(`🎉 Bravo ! Tu as gagné en ${time} secondes et ${moves} coups !`);
    }, 300);
  }
}
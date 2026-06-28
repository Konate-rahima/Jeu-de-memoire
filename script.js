const symbols = ["🍎", "🍌", "🍇", "🍒", "🍍", "🥝"];
let cards = [...symbols, ...symbols];

// mélange
cards.sort(() => 0.5 - Math.random());

const board = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");
const feedback = document.getElementById("feedback");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;

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
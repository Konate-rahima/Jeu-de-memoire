const symbols = ["🍎", "🍌", "🍇", "🍒", "🍍", "🥝"];
let cards = [...symbols, ...symbols];

// mélange des cartes
cards.sort(() => 0.5 - Math.random());

const board = document.getElementById("gameBoard");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// création des cartes
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

  // 🔥 ICI : clic correct (IMPORTANT)
  card.addEventListener("click", flipCard);

  board.appendChild(card);
});

// 🔄 fonction flip
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

// 🧠 vérification des paires
function checkMatch() {
  const isMatch =
    firstCard.dataset.symbol === secondCard.dataset.symbol;

  isMatch ? disableCards() : unflipCards();
}

// ✅ si match
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

// ❌ si pas match
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
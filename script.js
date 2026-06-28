const symbols = ["🍎", "🍌", "🍇", "🍒", "🍍", "🥝"];
let cards = [...symbols, ...symbols];

cards.sort(() => 0.5 - Math.random());

const board = document.getElementById("gameBoard");

cards.forEach(symbol => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">?</div>
      <div class="card-back">${symbol}</div>
    </div>
  `;

  card.addEventListener("click", () => {
    card.classList.toggle("flip");
  });

  board.appendChild(card);
});
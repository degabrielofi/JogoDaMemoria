const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";
let tempo = document.getElementById("time");

startGame();
setInterval(atualizarTexto, 1000);
function startGame() {
  initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards) {
  let gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  game.cards.forEach((card) => {
    let cardElement = document.createElement("div");
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;
    cardFlipped(cardElement);

    createCardContent(card, cardElement);

    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement("div");
  cardElementFace.classList.add(face);
  if (face === FRONT) {
    let iconElement = document.createElement("img");
    iconElement.classList.add(ICON);
    iconElement.src = "./images/" + card.icon + ".png";
    cardElementFace.appendChild(iconElement);
  } else {
    cardElementFace.innerHTML = "&lt/&gt";
  }
  element.appendChild(cardElementFace);
}

function flipCard() {
  if (game.setCard(this.id)) {
    movesAtualizar();

    this.classList.add("flip");
    if (game.secondCard) {
      if (game.checkMatch()) {
        game.clearCards();
        if (game.checkGameOver()) {
          let gameOverLayer = document.getElementById("gameOver");
          gameOverLayer.style.display = "flex";
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);

          firstCardView.classList.remove("flip");
          secondCardView.classList.remove("flip");
          game.unflipCards();
        }, 1000);
      }
    }
  }
}

function restart() {
  game.clearCards();
  startGame();
  let gameOverLayer = document.getElementById("gameOver");
  gameOverLayer.style.display = "none";
  game.minutosDezena = 0;
  game.minutosUnidade = 0;
  game.segundosDezena = 0;
  game.segundosUnidade = -1;
  game.moves = 0;
  movesAtualizar();
}

function movesAtualizar() {
  let movesInterface = document.getElementById("moves");
  movesInterface.innerHTML = "Jogadas: " + game.moves;
  if (game.checkGameOver()) {
    movesInterface.innerHTML = "Jogadas: " + game.moves;
  }
}

function atualizarTexto() {
  if (!game.checkGameOver()) {
    game.timer();
  }
  tempo.innerHTML =
    "Tempo: " +
    game.minutosDezena +
    game.minutosUnidade +
    ":" +
    game.segundosDezena +
    game.segundosUnidade;
}

function cardFlipped(elemento) {
  setTimeout(() => {
    elemento.classList.remove("flip");
  }, 3000);
  elemento.classList.add("flip");
}

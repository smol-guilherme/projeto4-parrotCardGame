let counter = 0;
let timer = 0;
let min = 0;
let id;

const DELAY = 1000;
const FLIP_ANIM_TIME = 330;

function initializeGame() {
    initializeTimer();
    counter = 0;
    timer = 0;
    min = 0;
    let input = 0;
    do {
        input = prompt("Escolha um número par de cartas: \n(Min: 4, Max: 14)");
        input = Number(input)
    } while (input < 4 || input % 2 !== 0 || input > 14)
    pickDeck(input); 
}

function initializeTimer() {
    const pageTop = document.querySelector("main")
    pageTop.innerHTML =
    `
    <span class="timer">0:00</span>
    <h1 class="game-title">PARROT CARD GAME</h1>
    `
}

function restartGame() {
    const currentGame = document.querySelectorAll(".card-element");
    let input = "";
    const confirm = "sim"
    const deny = "não"
    do {
        input = prompt("Gostaria de jogar novamente? (sim / não)", "sim");
        input = input.toLowerCase();
        input.replace(" ", "")
    } while(input !== deny && input !== confirm)
    
    if (input === "sim") {
        for(let i = 0; i < currentGame.length; i++) {
            currentGame[i].remove()
        }
        initializeGame();
    } else
        endGame();
}

function pickDeck(deck) {
    let deckArray = [];
    let pairsSet = 0;
    for (i = 0; i < deck; i++) {
        if (i % 2 === 0)
            deckArray.push(pairsSet + 1)
        else
        {
            pairsSet++;
            deckArray.push(pairsSet)
        }
    }
    dealCards(deckArray);
}

function dealCards(deck) {
    deck.sort(shuffle)
    const board = document.querySelector("main");
    for(i = 0; i < deck.length; i++) {
        board.innerHTML +=
        `
        <div onclick="flipCard(this)" class="card-element playable">
            <div class="card-front card-face">
                <img src="./images/gui/front.png" alt="">
            </div>
            <div class="card-back card-face">
                <img src="./images/content/0${deck[i]}_parrot.gif" alt="">
            </div>
        </div>
        `
    }
    const cards = board.querySelectorAll(".playable");
    cards.forEach(unlockCards)
    id = setInterval(gameTimer, DELAY)
}

function shuffle() {
    return Math.random() - 0.5;
}

function flipCard(card) {
    counter++;
    card.classList.add("selected")
    card.querySelector(".card-front").classList.add("flip-front")
    card.querySelector(".card-back").classList.add("flip-back")
    const checkPair = card.parentNode.querySelectorAll(".selected")
    const deck = document.querySelectorAll(".playable")
    if(checkPair.length === 2) {
        deck.forEach(lockCards)
        if(checkPair[0].querySelector(".card-back img").src === checkPair[1].querySelector(".card-back img").src) {
            checkPair.forEach(removeFromGame)
        } else {
            setTimeout(unflipCard, DELAY)
        }
    }
    setTimeout(unlockCards, DELAY+FLIP_ANIM_TIME)
    setTimeout(gameOver, 50)
}

function removeFromGame(card) {
    card.classList.remove("playable", "selected")
    card.removeAttribute("onclick")
}

function lockCards(card) {
    card.removeAttribute("onclick")
}

function unlockCards() {
    const deck = document.querySelectorAll(".playable")
    deck.forEach((card) => {
        card.setAttribute("onclick", "flipCard(this)")
    })
}

function unflipCard() {
    const selPair = document.querySelectorAll(".selected.playable")
    for(let i = 0; i < selPair.length; i++)
    {
        selPair[i].querySelector(".card-front").classList.remove("flip-front")
        selPair[i].querySelector(".card-back").classList.remove("flip-back")
        selPair[i].classList.remove("selected")
    }
}

function gameTimer() {
    timer++
    const sec = timer % 60;
    if (sec % 60 === 0)
        min++;
    const clock = document.querySelector(".timer");
    if(sec < 10)
        clock.innerHTML = `${min}:0${sec}`
    else
        clock.innerHTML = `${min}:${sec}`
}

function gameOver() {
    const cardsLeft = document.querySelectorAll(".playable")
    let sec = timer % 60
    if(sec < 10)
        sec = `0${sec}`
    if(cardsLeft.length === 0) {
        alert(`Parabéns, você ganhou após ${counter} jogadas\nSeu tempo: ${min}:${sec}`)
        clearInterval(id);
        restartGame();
    }
}

function endGame() {
    alert("Obrigado por jogar o magnífico e modesto Parrot Card Game");
    return 0;
}

function main() {
    initializeGame();
}

main();

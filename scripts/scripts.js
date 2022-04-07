function main() {
    initializeGame();
}

main();

function initializeGame() {
    let input;
    do {
        input = prompt("Escolha um número par de cartas: \n(Min: 4, Max: 14)");
        input = Number(input)
    } while (input < 4 || input % 2 !== 0 || input > 14)
    pickDeck(input); 
    // restartGame();
}

function restartGame() {
    let input;

    do {
        input  = prompt("Gostaria de jogar novamente? (sim / não)");
        if (input === "sim") {
            initializeGame();
        }
    } while (input !== "não")
    endGame();
}

function endGame() {
    alert("Obrigado por jogar o magnífico e modesto Parrot Card Game");
    return 0;
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

function shuffle() {
    return Math.random() - 0.5;
}

function flipCard(card) {
    card.querySelector(".card-front").classList.toggle("hidden")
    card.querySelector(".card-back").classList.toggle("hidden")
    setTimeout(() => {
        console.log("timeout started")
        card.querySelector(".card-front.hidden").classList.remove("hidden")
        card.querySelector(".card-back").classList.add("hidden")    
    }, 1000);
}

function unflipCard(card) {
    card.querySelector(".card-front").classList.toggle("hidden")
    card.querySelector(".card-back").classList.toggle("hidden")
}

function dealCards(deck) {
    deck.sort(shuffle)
    const board = document.querySelector("main");
    for(i = 0; i < deck.length; i++) {
        board.innerHTML +=
        `
        <div onclick="flipCard(this)" class="card-element">
            <img class="card-front" src="./images/gui/front.png" alt="">
            <img class="card-back hidden" src="./images/content/0${deck[i]}_parrot.gif" alt="">
        </div>
        `
        // let card = document.createElement("div");
        // let imgFront = document.createElement("img");
        // let imgBack = document.createElement("img");
        // card = board.appendChild(card);
        // card.classList.add("card-element");
        // card.setAttribute("onclick", "flipCard(this)");
        // card.appendChild(imgFront);
        // imgFront.classList.add("card-front");
        // imgFront.classList.add("card-front", "hidden");
        // imgFront.setAttribute("src", "./images/gui/front.png")

        // card.appendChild(imgBack);
        // imgBack.classList.add("card-back", "hidden");
        // imgBack.classList.add("card-back");
        // imgBack.setAttribute("src", `./images/content/0${deck[i]}_parrot.gif`)
    }
    playGame();
}

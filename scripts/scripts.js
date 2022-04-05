function main() {
    initializeGame();
}

main();

function initializeGame() {
    let input = -1;
    while(input % 2 !== 0) {
        input = prompt("Escolha um número par de cartas: \n(Min: 4, Max: 14)\n(Insira X para sair)")
        if (input % 2 === 0)
            pickDeck(input);
    }
    restartGame();
}

function restartGame() {
    let input = undefined;

    while (input !== "não"){
        input  = prompt("Gostaria de jogar novamente? (sim / não)");
        if (input === "sim") {
            initializeGame();
        }
    }
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

function dealCards(deck) {
    deck.sort(shuffle)
    const board = document.querySelector(".card-board");
    for(i = 0; i < deck.length; i++) {
        let card = document.createElement("div");
        let imgFront = document.createElement("img");
        let imgBack = document.createElement("img");
        card = board.appendChild(card);
        card.classList.add("card-element");
        card.appendChild(imgFront);
        imgFront.classList.add("card-front");
        imgFront.setAttribute("src", "./images/gui/front.png")
        card.appendChild(imgBack);
        imgBack.classList.add("card-back");
        imgBack.setAttribute("src", `./images/content/0${deck[i]}_parrot.gif`)
        imgBack.classList.add("hidden");
    }
    playGame();
}

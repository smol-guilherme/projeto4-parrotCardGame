function main() {
    initializeGame()
}

function initializeGame() {
    let input = null;
    while(input !== 'x') {
        input = prompt("Escolha um número par de cartas: \n(Min: 4, Max: 14)\n(Insira X para sair)")
        if (input % 2 === 0)
            pickDeck(input)
            return 1;
    }
    restartGame();
}

function restartGame() {
    while (input !== "não"){
        const input  = prompt("Gostaria de jogar novamente? (sim / não)");
        if (input === "sim")
            initializeGame();
            break;
    }
    alert("Obrigado por jogar o magnífico e modesto Parrot Card Game");
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
    for(i = 0; i < deck.length; i++) {
        
    }
}

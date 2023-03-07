/**
 * Displays a welcome message to the user.
 *
 * @returns {void}
 */
function displayWelcome() {
    console.log('\nWelcome to Player Pairs!\nIn this game each player will receive 5 cards.\nOnce each hand has been dealt, we will compare to see who has the most pairs!\n');
}

/**
 * Creates one or more decks of cards.
 *
 * @param {number} numberOfDecks - The number of decks to create.
 * @returns {string[]} An array of cards representing one or more decks.
 */
function createDecks(numberOfDecks) {
    const cards = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
    let deckOrDecks = [];
    for (let i = 0; i < 4 * numberOfDecks; i++) {
        deckOrDecks = deckOrDecks.concat(cards);
    }
    return deckOrDecks;
}

/**
 * Shuffles the deck of cards randomly.
 *
 * @param {string[]} deckOrDecks - The deck or decks of cards to shuffle.
 * @returns {string[]} A shuffled deck of cards.
 */
function shuffleDeck(deckOrDecks) {
    let shuffledDeck = deckOrDecks.slice(); // avoiding reference data type behavior for the shuffled deck to original deck
    for (let index = 0; index < shuffledDeck.length; index++) {
        const newCardIndexLocation = Math.floor(Math.random() * (shuffledDeck.length - 1));
        const cardAtFirstPosition = shuffledDeck[index];
        const cardAtSecondPosition = shuffledDeck[newCardIndexLocation];
        shuffledDeck[index] = cardAtSecondPosition;
        shuffledDeck[newCardIndexLocation] = cardAtFirstPosition;
    }
    return shuffledDeck;
}

/**
 * Deals a hand of cards from the deck.
 *
 * @param {string[]} deck - The deck of cards to deal from.
 * @param {number} cardsPerHand - The number of cards to deal to each player.
 * @returns {string[]} A hand of cards.
 */
function dealHand(deck, cardsPerHand) {
    const newHand = [];
    for (let i = 0; i < cardsPerHand; i++) {
        const dealtCard = deck.shift();
        newHand.push(dealtCard);
    }
    return newHand;
}

/**
 * Determines the highest number of pairs in a hand of cards.
 *
 * @param {string[]} hand - A hand of cards.
 * @returns {number} The highest number of pairs in the hand.
 */
function getHighestPairCount(hand) {
    const cardCounts = {};
    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];
        if (card in cardCounts) {
            cardCounts[card] += 1;
        } else {
            cardCounts[card] = 1;
        }
    }
    const sortedCardCounts = Object.entries(cardCounts).sort((a, b) => b[1] - a[1]);
    return sortedCardCounts[0][1];
}

/**
 * Displays the results of each round of the game.
 *
 * @param {Object[]} playerResults - An array of player results.
 * @param {number} playerResults[].playerNumber - The number of the player.
 * @param {string[]} playerResults[].hand - The hand of cards dealt to the player.
 * @param {number} playerResults[].numberOfPairs - The number of pairs of cards in the player's hand.
*

@returns {void}
*/
function displayRoundResults(playerResults) {
    for (let i = 0; i < playerResults.length; i++) {
        console.log(`Player ${playerResults[i].playerNumber}\nHand: ${playerResults[i].hand.join(' ')}\nNumber of Pairs: ${playerResults[i].numberOfPairs}\n`);
    }
}
/**

Determines the winner of the game based on the highest number of pairs.
@param {Object[]} playerResults - An array of player results.
@param {number} playerResults[].playerNumber - The number of the player.
@param {string[]} playerResults[].hand - The hand of cards dealt to the player.
@param {number} playerResults[].numberOfPairs - The number of pairs of cards in the player's hand.
@returns {void}
*/
function displayAndDetermineWinnerOrTie(playerResults) {
    const highestPairValue = Math.max(...playerResults.map((playerResult) => playerResult.numberOfPairs));
    const topHandPlayers = playerResults.filter((playerResult) => playerResult.numberOfPairs === highestPairValue);
    if (topHandPlayers.length === 1) {
        console.log(`Player ${topHandPlayers[0].playerNumber} is the winner!`);
    } else {
        console.log(`There was a tie among players ${topHandPlayers.map((topPlayer) => topPlayer.playerNumber)}.`);
    }
}

/**

Runs the game with the specified number of players, cards, and rounds.
@param {number} numberOfPlayers - The number of players in the game.
@param {number} numberOfCards - The number of cards dealt to each player.
@param {number} numberOfRounds - The number of rounds to play.
@returns {void}
*/
function runGame(numberOfPlayers, numberOfCards, numberOfRounds) {
    displayWelcome();
    const deck = createDecks(1);
    const shuffledDeck = shuffleDeck(deck);
    const playerHands = Array.from({ length: numberOfPlayers }, () => dealHand(shuffledDeck, numberOfCards));
    const finalPlayersResults = playerHands.map((playerHand, index) => ({
        playerNumber: index + 1,
        hand: playerHand,
        numberOfPairs: getHighestPairCount(playerHand)
    }));
    displayRoundResults(finalPlayersResults);
    displayAndDetermineWinnerOrTie(finalPlayersResults);
}


runGame(4, 5, 3);


module.exports = {
    displayWelcome,
    createDecks,
    shuffleDeck,
    dealHand,
    getHighestPairCount,
    displayRoundResults,
    displayAndDetermineWinnerOrTie,
    runGame
};
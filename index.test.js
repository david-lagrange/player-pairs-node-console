const {
    displayWelcome,
    createDecks,
    shuffleDeck,
    dealHand,
    getHighestPairCount,
    displayRoundResults,
    displayAndDetermineWinnerOrTie,
    runGame
} = require('./index.js');

describe('shuffleDeck', () => {
    test('returns a shuffled deck', () => {
        const deck = ['Ace', 'Two', 'Three', 'Four', 'Five'];
        const shuffledDeck = shuffleDeck(deck);
        expect(shuffledDeck).not.toEqual(deck);
    });

    test('returns a deck with the same cards', () => {
        const deck = ['Ace', 'Two', 'Three', 'Four', 'Five'];
        const shuffledDeck = shuffleDeck(deck);
        deck.forEach((card) => {
            expect(shuffledDeck.includes(card)).toBe(true);
        });
    });
});
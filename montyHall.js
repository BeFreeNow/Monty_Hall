const MIN_CHOISE = 1
const MAX_CHOISE = 3

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

class Game {
    constructor(minChoice = 1, maxChoice = 3) {
        this.winningNumber = generateRandom(minChoice, maxChoice)
    }

    getTwoChoices(playerGuess) {
        const winningNumber = this.winningNumber
        const isGuessCorrect = this.winningNumber === playerGuess
        const secondChoice = isGuessCorrect ? this.generateSecondChoice(winningNumber) : winningNumber
        // Line 24 above, makes is obvious that
        // if the guess is incorrect (which happens in most cases) -
        // then the second choice is the winning number😂
        const choices = [secondChoice, winningNumber]
        const shuffledChoices = this.shuffle(choices)
        return shuffledChoices
    }

    generateSecondChoice(NumberToSkip) {
        let secondChoise
        const max = MAX_CHOISE - 1
        const random = generateRandom(MIN_CHOISE, max)

        if (random === NumberToSkip) secondChoise = random + 1
        else secondChoise = random

        return secondChoise
    }

    shuffle(choices) {
        return choices.sort(() => Math.random() - 0.5)
    }

    getResult(guess) {
        return { winningNumber: this.winningNumber, guess, isVictory: guess === this.winningNumber }
    }
}

class Player {
    play() {
        const game = new Game(MIN_CHOISE, MAX_CHOISE)
        const playerGuess = generateRandom(MIN_CHOISE, MAX_CHOISE)
        const choices = game.getTwoChoices(playerGuess)
        const playerChoise = this.makeChoice(choices, playerGuess)
        const gameResult = game.getResult(playerChoise)
        return gameResult
    }

    makeChoice(choices, playerGuess) {
        return choices.find(choice => choice !== playerGuess)
    }
}

function playAndCountVictories(gamesAmount) {
    const player = new Player()
    let victoriesCount = 0
    for (let i = 0; i < gamesAmount; i++) {
        const gameResult = player.play()
        if (gameResult.isVictory) victoriesCount++
    }
    return victoriesCount
}

const victoriesCount = playAndCountVictories(1000)
console.log(victoriesCount)

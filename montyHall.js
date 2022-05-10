const MIN_CHOICE = 1
const MAX_CHOICE = 3

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

class Game {
    constructor(minChoice = 1, maxChoice = 3) {
        this.winningNumber = generateRandom(minChoice, maxChoice)
    }

    getSecondChoice(playerGuess) {
        const winningNumber = this.winningNumber
        const isGuessCorrect = this.winningNumber === playerGuess
        const secondChoice = isGuessCorrect ? this.generateSecondChoice(winningNumber) : winningNumber
        // Line 16 above, makes is obvious that
        // if the guess is incorrect (which happens in most cases) -
        // then the second choice is the winning number😂
        return secondChoice
    }

    generateSecondChoice(NumberToSkip) {
        let secondChoise
        const max = MAX_CHOICE - 1
        const random = generateRandom(MIN_CHOICE, max)

        if (random === NumberToSkip) secondChoise = random + 1
        else secondChoise = random

        return secondChoise
    }

    checkIsCorrectChoice(guess) {
        return  guess === this.winningNumber 
    }
}

class Player {
    play() {
        const game = new Game(MIN_CHOICE, MAX_CHOICE)
        const playerGuess = generateRandom(MIN_CHOICE, MAX_CHOICE)
        const secondChoice = game.getSecondChoice(playerGuess)
        return game.checkIsCorrectChoice(secondChoice)
    }
}

function playAndCountVictories(gamesAmount) {
    const player = new Player()
    let victoriesCount = 0
    for (let i = 0; i < gamesAmount; i++) {
        const isVictory = player.play()
        if (isVictory) victoriesCount++
    }
    return victoriesCount
}

const victoriesCount = playAndCountVictories(1000)
console.log(victoriesCount)

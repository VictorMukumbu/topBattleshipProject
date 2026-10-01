/**
 * @jest-environment jsdom
 */

import { startGame } from "../src/index"

beforeEach(() => {
    document.body.innerHTML = `
        <main>
            <div id="game-status"></div>

            <button id="direction-button">
                Vertical
            </button>

            <div id="fleet"></div>

            <div id="player-board"></div>
            <div id="opponent-board"></div>
        </main>
    `
})

test(`startGame creates the DOM UI`, () => {
    const ui = startGame()

    expect(ui.ui).toBeDefined()
})

test(`startGame uses the existing game status element`, () => {
    const gameStatus =
        document.querySelector("#game-status")

    const ui = startGame()

    expect(ui.gameStatus).toBe(gameStatus)
})

test(`startGame uses the existing direction button`, () => {
    const directionButton =
        document.querySelector("#direction-button")

    const ui = startGame()

    expect(ui.directionButton).toBe(directionButton)
})

test(`startGame uses the existing fleet container`, () => {
    const fleet =
        document.querySelector("#fleet")

    const ui = startGame()

    expect(ui.fleetContainer).toBe(fleet)
})

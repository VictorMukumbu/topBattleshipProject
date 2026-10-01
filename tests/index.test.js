/**
 * @jest-environment jsdom
 */

import { startGame } from "../src/index"

test(`startGame creates the DOM UI`, () => {
    const ui = startGame()

    expect(ui.ui).toBeDefined()
})

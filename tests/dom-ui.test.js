/**
 * @jest-environment jsdom
 */

import { DomUi } from "../src/dom-ui"

test(`DomUi() accesses the GameUi`, () => {
    expect(Object.hasOwn(DomUi(), "gameUi")).toBe(true)
})
test(`DomUi() provides a board container`, () => {
    const gameUi = DomUi()

    expect(Object.hasOwn(gameUi, "boardContainer")).toBe(true)
})
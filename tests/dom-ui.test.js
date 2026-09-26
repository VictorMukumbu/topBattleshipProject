import { DomUi } from "../src/dom-ui"

test(`DomUi() accesses the GameUi`, () => {
    expect(Object.hasOwn(DomUi(), "gameUi")).toBe(true)
})
/**
 * @jest-environment jsdom
 */

import { DomUi } from "../src/dom-ui"

test(`DomUi() accesses the GameUi`, () => {
    expect(Object.hasOwn(DomUi(), "ui")).toBe(true)
})
test(`DomUi() provides a board container`, () => {
    const ui = DomUi()

    expect(Object.hasOwn(ui, "boardContainer")).toBe(true)
})
test(`DomUi() gives the board container a board class`, () => {
    const ui = DomUi()

    expect(ui.boardContainer.classList.contains("board")).toBe(true)
})
test(`DomUi() creates 64 board cells`, () => {
    const ui = DomUi()

    expect(ui.boardContainer.children).toHaveLength(64)
})
test(`The first board cell has coordinate [0, 0]`, () => {
    const ui = DomUi()

    expect(ui.boardContainer.children[0].dataset.row).toBe("0")
    expect(ui.boardContainer.children[0].dataset.column).toBe("0")
})
test(`The last board cell has coordinate [7, 7]`, () => {
    const ui = DomUi()

    expect(ui.boardContainer.children[63].dataset.row).toBe("7")
    expect(ui.boardContainer.children[63].dataset.column).toBe("7")
})
test(`DomUi() marks an occupied DOM cell`, () => {
    const ui = DomUi()
    const ship = {
        coordinates: [[2, 3]]
    }

    ui.ui.playerBoard.placeShip(ship, ship.coordinates)

    ui.renderBoard(ui.ui.playerBoard)

    expect(ui.boardContainer.children[19].classList.contains("ship")).toBe(true)
})
test(`DomUi() marks a missed DOM cell`, () => {
    const ui = DomUi()

    ui.ui.playerBoard.receiveAttack([3, 4])

    ui.renderBoard(ui.ui.playerBoard)

    expect(ui.boardContainer.children[28].classList.contains("missed")).toBe(true)
})
test(`DomUi() marks a hit DOM cell`, () => {
    const ui = DomUi()

    const ship = {
        hits: 0,
        length: 1,
        hit() {
            this.hits += 1
        },
        isSunk() {
            return this.hits === this.length
        }
    }

    ui.ui.playerBoard.placeShip(ship, [[2, 3]])
    ui.ui.playerBoard.receiveAttack([2, 3])

    ui.renderBoard(ui.ui.playerBoard)

    expect(
        ui.boardContainer.children[19].classList.contains("hit")
    ).toBe(true)
})
test(`DomUi() leaves an unattacked empty DOM cell unmarked`, () => {
    const ui = DomUi()

    ui.renderBoard(ui.ui.playerBoard)

    const cell = ui.boardContainer.children[0]

    expect(cell.classList.contains("ship")).toBe(false)
    expect(cell.classList.contains("hit")).toBe(false)
    expect(cell.classList.contains("missed")).toBe(false)
})
test(`DomUi() adds the board container to the document`, () => {
    DomUi()

    expect(document.body.contains(
        document.querySelector(".board")
    )).toBe(true)
})
test(`DomUi() gives every board cell a cell class`, () => {
    const ui = DomUi()

    for (const cell of ui.boardContainer.children) {
        expect(cell.classList.contains("cell")).toBe(true)
    }
})
test(`DomUi() does not duplicate cell classes when rendering twice`, () => {
    const ui = DomUi()

    const ship = {
        coordinates: [[2, 3]]
    }

    ui.ui.playerBoard.placeShip(ship, ship.coordinates)

    ui.renderBoard(ui.ui.playerBoard)
    ui.renderBoard(ui.ui.playerBoard)

    expect(ui.boardContainer.children[19].className).toBe("cell ship")
})
test(`DomUi() marks only the attacked ship cell as hit`, () => {
    const ui = DomUi()

    const ship = {
        hits: 0,
        length: 3,
        hit() {
            this.hits += 1
        },
        isSunk() {
            return this.hits === this.length
        }
    }

    ui.ui.playerBoard.placeShip(ship, [[2, 3], [2, 4], [2, 5]])

    ui.ui.playerBoard.receiveAttack([2, 4])

    ui.renderBoard(ui.ui.playerBoard)

    expect(
        ui.boardContainer.children[19].classList.contains("hit")
    ).toBe(false)

    expect(
        ui.boardContainer.children[20].classList.contains("hit")
    ).toBe(true)

    expect(
        ui.boardContainer.children[21].classList.contains("hit")
    ).toBe(false)
})
test(`DomUi() provides an opponent board container`, () => {
    const ui = DomUi()

    expect(Object.hasOwn(ui, "opponentBoardContainer")).toBe(true)
})
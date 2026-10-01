/**
 * @jest-environment jsdom
 */

import { DomUi } from "../src/dom-ui"
import { Ship } from "../src/ship"

function completeSetup(ui) {
    const placements = [
        [ui.playerFleet[0], 0],
        [ui.playerFleet[1], 16],
        [ui.playerFleet[2], 32],
        [ui.playerFleet[3], 48],
        [ui.playerFleet[4], 6],
    ]

    placements.forEach(([ship, cellIndex]) => {
        ui.selectShip(ship)
        ui.boardContainer.children[cellIndex].click()
    })
}

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
test(`DomUi() creates 64 opponent board cells`, () => {
    const ui = DomUi()

    expect(ui.opponentBoardContainer.children).toHaveLength(64)
})
test(`The first opponent board cell has coordinate [0, 0]`, () => {
    const ui = DomUi()

    expect(ui.opponentBoardContainer.children[0].dataset.row).toBe("0")
    expect(ui.opponentBoardContainer.children[0].dataset.column).toBe("0")
})

test(`The last opponent board cell has coordinate [7, 7]`, () => {
    const ui = DomUi()

    expect(ui.opponentBoardContainer.children[63].dataset.row).toBe("7")
    expect(ui.opponentBoardContainer.children[63].dataset.column).toBe("7")
})
test(`DomUi() marks an occupied opponent board cell`, () => {
    const ui = DomUi()

    const ship = {
        coordinates: [[2, 3]]
    }

    ui.ui.opponentBoard.placeShip(ship, ship.coordinates)

    ui.renderBoard(ui.ui.opponentBoard)

    expect(
        ui.opponentBoardContainer.children[19]
            .classList.contains("ship")
    ).toBe(true)
})
test(`DomUi() marks a missed opponent board cell`, () => {
    const ui = DomUi()

    ui.ui.opponentBoard.receiveAttack([3, 4])

    ui.renderBoard(ui.ui.opponentBoard)

    expect(
        ui.opponentBoardContainer.children[28]
            .classList.contains("missed")
    ).toBe(true)
})
test(`DomUi() marks a hit opponent board cell`, () => {
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

    ui.ui.opponentBoard.placeShip(ship, [[2, 3]])
    ui.ui.opponentBoard.receiveAttack([2, 3])

    ui.renderBoard(ui.ui.opponentBoard)

    expect(
        ui.opponentBoardContainer.children[19]
            .classList.contains("hit")
    ).toBe(true)
})
test(`DomUi() renders multiple opponent board cell states`, () => {
    const ui = DomUi()

    const ship = {
        hits: 0,
        length: 2,
        hit() {
            this.hits += 1
        },
        isSunk() {
            return this.hits === this.length
        }
    }

    ui.ui.opponentBoard.placeShip(
        ship,
        [[2, 3], [2, 4]]
    )

    ui.ui.opponentBoard.receiveAttack([2, 3])
    ui.ui.opponentBoard.receiveAttack([3, 4])

    ui.renderBoard(ui.ui.opponentBoard)

    expect(
        ui.opponentBoardContainer.children[19]
            .classList.contains("hit")
    ).toBe(true)

    expect(
        ui.opponentBoardContainer.children[20]
            .classList.contains("ship")
    ).toBe(true)

    expect(
        ui.opponentBoardContainer.children[28]
            .classList.contains("missed")
    ).toBe(true)
})
test(`clicking an opponent cell attacks that coordinate`, () => {
    const ui = DomUi()
    completeSetup(ui)

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

    ui.ui.opponentBoard.placeShip(ship, [[2, 3]])

    ui.opponentBoardContainer.children[19].click()

    expect(ship.hits).toBe(1)
})
test(`clicking an opponent ship cell marks it as hit`, () => {
    const ui = DomUi()
    completeSetup(ui)

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

    ui.ui.opponentBoard.placeShip(ship, [[2, 3]])

    ui.opponentBoardContainer.children[19].click()

    expect(
        ui.opponentBoardContainer.children[19]
            .classList.contains("hit")
    ).toBe(true)
})
test(`clicking an empty opponent cell marks it as missed`, () => {
    const ui = DomUi()
    completeSetup(ui)

    ui.opponentBoardContainer.children[28].click()

    expect(
        ui.opponentBoardContainer.children[28]
            .classList.contains("missed")
    ).toBe(true)
})
test(`clicking an opponent cell attacks its own coordinate`, () => {
    const ui = DomUi()
    completeSetup(ui)

    ui.opponentBoardContainer.children[63].click()

    expect(ui.ui.opponentBoard.missedAttacks)
        .toContainEqual([7, 7])
})
test(`clicking a player board cell does not attack the opponent`, () => {
    const ui = DomUi()

    ui.boardContainer.children[19].click()

    expect(ui.ui.opponentBoard.missedAttacks).toHaveLength(0)
    expect(ui.ui.opponentBoard.hitAttacks).toHaveLength(0)
})

test(`clicking the same opponent cell twice does not create two attacks`, () => {
    const ui = DomUi()
    completeSetup(ui)

    ui.opponentBoardContainer.children[28].click()
    ui.opponentBoardContainer.children[28].click()

    expect(ui.ui.opponentBoard.missedAttacks).toHaveLength(1)
})
test(`a hit cell is not marked as missed`, () => {
    const ui = DomUi()
    completeSetup(ui)

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

    ui.ui.opponentBoard.placeShip(ship, [[2, 3]])

    ui.opponentBoardContainer.children[19].click()

    const cell = ui.opponentBoardContainer.children[19]

    expect(cell.classList.contains("hit")).toBe(true)
    expect(cell.classList.contains("missed")).toBe(false)
})
test(`rendering the opponent board does not modify the player board`, () => {
    const ui = DomUi()

    const ship = {
        coordinates: [[2, 3]]
    }

    ui.ui.opponentBoard.placeShip(ship, ship.coordinates)

    ui.renderBoard(ui.ui.opponentBoard)

    expect(
        ui.boardContainer.children[19]
            .classList.contains("ship")
    ).toBe(false)

    expect(
        ui.opponentBoardContainer.children[19]
            .classList.contains("ship")
    ).toBe(true)
})
test(`DomUi() provides access to the current player`, () => {
    const ui = DomUi()

    expect(ui.currentPlayer).toBe(ui.ui.currentPlayer)
})

test(`DomUi() can change the current player`, () => {
    const ui = DomUi()

    const firstPlayer = ui.currentPlayer

    ui.changeCurrentPlayer()

    expect(ui.currentPlayer).not.toBe(firstPlayer)
})

test(`computer player makes an attack after the human turn`, () => {
    const ui = DomUi()
    completeSetup(ui)

    const ship = {
        hits: 0,
        length: 2,
        hit() {
            this.hits += 1
        },
        isSunk() {
            return this.hits === this.length
        }
    }

    ui.ui.opponentBoard.placeShip(
        ship,
        [[0, 0], [0, 1]]
    )

    const originalRandom = Math.random

    Math.random = () => 0.5

    ui.opponentBoardContainer.children[0].click()

    Math.random = originalRandom

    expect(
        ui.ui.playerBoard.missedAttacks.length +
        ui.ui.playerBoard.hitAttacks.length
    ).toBe(1)
})

test(`computer does not attack after the human wins`, () => {
    const ui = DomUi()

    ui.ui.opponentBoard.ships = []

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

    ui.ui.opponentBoard.placeShip(ship, [[0, 0]])

    completeSetup(ui)

    ui.opponentBoardContainer.children[0].click()

    expect(ui.ui.isGameOver()).toBe(true)

    expect(
        ui.ui.playerBoard.missedAttacks.length +
        ui.ui.playerBoard.hitAttacks.length
    ).toBe(0)
})


test(`DomUi() provides a function for placing a ship`, () => {
    const ui = DomUi()

    expect(typeof ui.placeShip).toBe("function")
})
test(`placeShip() calculates coordinates from a starting coordinate and direction`, () => {
    const ui = DomUi()

    const ship = Ship(3)

    ui.placeShip(ship, [2, 3], "horizontal")

    expect(ui.ui.playerBoard.ships[0].coordinates).toEqual([
        [2, 3],
        [2, 4],
        [2, 5]
    ])
})
test(`placeShip() does not place a ship when the placement is invalid`, () => {
    const ui = DomUi()

    const ship = Ship(3)

    ui.placeShip(ship, [2, 6], "horizontal")

    expect(ui.ui.playerBoard.ships).toHaveLength(0)
})
test(`placeShip() does not place a ship when it overlaps an existing ship`, () => {
    const ui = DomUi()

    const firstShip = Ship(3)
    const secondShip = Ship(3)

    ui.placeShip(firstShip, [2, 3], "horizontal")
    ui.placeShip(secondShip, [2, 4], "horizontal")

    expect(ui.ui.playerBoard.ships).toHaveLength(1)
    expect(ui.ui.playerBoard.ships[0].ship).toBe(firstShip)
})
test(`placeShip() calculates vertical coordinates from a starting coordinate`, () => {
    const ui = DomUi()

    const ship = Ship(3)

    ui.placeShip(ship, [2, 3], "vertical")

    expect(ui.ui.playerBoard.ships[0].coordinates).toEqual([
        [2, 3],
        [3, 3],
        [4, 3]
    ])
})
test(`placeShip() does not place a ship with an invalid direction`, () => {
    const ui = DomUi()

    const ship = Ship(3)

    ui.placeShip(ship, [2, 3], "diagonal")

    expect(ui.ui.playerBoard.ships).toHaveLength(0)
})
test(`DomUi() can change the ship placement direction`, () => {
    const ui = DomUi()

    expect(ui.placeShipDirection).toBe("horizontal")

    ui.changePlaceShipDirection()

    expect(ui.placeShipDirection).toBe("vertical")

    ui.changePlaceShipDirection()

    expect(ui.placeShipDirection).toBe("horizontal")
})
test(`clicking a player board cell selects the starting coordinate`, () => {
    const ui = DomUi()

    ui.boardContainer.children[19].click()

    expect(ui.startCoordinate).toEqual([2, 3])
})
test(`placeShip() uses the selected coordinate and direction`, () => {
    const ui = DomUi()

    const ship = Ship(3)

    ui.boardContainer.children[19].click()

    ui.placeShip(ship)

    expect(ui.ui.playerBoard.ships[0].coordinates).toEqual([
        [2, 3],
        [2, 4],
        [2, 5]
    ])
})
test(`placeShip() clears the selected starting coordinate after a successful placement`, () => {
    const ui = DomUi()

    const ship = Ship(3)

    ui.boardContainer.children[19].click()

    ui.placeShip(ship)

    expect(ui.startCoordinate).toBe(null)
})
test(`placeShip() uses the selected vertical direction`, () => {
    const ui = DomUi()

    const ship = Ship(3)

    ui.changePlaceShipDirection()

    ui.boardContainer.children[19].click()

    ui.placeShip(ship)

    expect(ui.ui.playerBoard.ships[0].coordinates).toEqual([
        [2, 3],
        [3, 3],
        [4, 3]
    ])
})
test(`DomUi() provides a ship direction control`, () => {
    const ui = DomUi()

    expect(ui.directionButton).toBeDefined()
    expect(ui.directionButton.tagName).toBe("BUTTON")
})
test(`clicking the direction button changes ship orientation`, () => {
    const ui = DomUi()

    expect(ui.placeShipDirection).toBe("horizontal")

    ui.directionButton.click()

    expect(ui.placeShipDirection).toBe("vertical")

    ui.directionButton.click()

    expect(ui.placeShipDirection).toBe("horizontal")
})
test(`direction button updates its label when orientation changes`, () => {
    const ui = DomUi()

    expect(ui.directionButton.textContent).toBe("Vertical")

    ui.directionButton.click()

    expect(ui.directionButton.textContent).toBe("Horizontal")

    ui.directionButton.click()

    expect(ui.directionButton.textContent).toBe("Vertical")
})
test(`invalid placement keeps the selected starting coordinate`, () => {
    const ui = DomUi()

    const ship = Ship(3)

    ui.boardContainer.children[22].click()

    ui.placeShip(ship)

    expect(ui.startCoordinate).toEqual([2, 6])
    expect(ui.ui.playerBoard.ships).toHaveLength(0)
})
test(`placeShip() renders a successfully placed ship`, () => {
    const ui = DomUi()

    const ship = Ship(3)

    ui.boardContainer.children[19].click()

    ui.placeShip(ship)

    expect(ui.boardContainer.children[19].classList.contains("ship"))
        .toBe(true)

    expect(ui.boardContainer.children[20].classList.contains("ship"))
        .toBe(true)

    expect(ui.boardContainer.children[21].classList.contains("ship"))
        .toBe(true)
})
test(`direction button controls the direction used for ship placement`, () => {
    const ui = DomUi()

    const ship = Ship(3)

    ui.directionButton.click()

    ui.boardContainer.children[19].click()

    ui.placeShip(ship)

    expect(ui.ui.playerBoard.ships[0].coordinates).toEqual([
        [2, 3],
        [3, 3],
        [4, 3]
    ])
})
test(`DomUi provides a playTurn function`, () => {
    const domUi = DomUi()

    expect(Object.hasOwn(domUi, "playTurn")).toBe(true)
})
test(`playTurn causes the computer to attack after the human attack`, () => {
    const domUi = DomUi()

    const coordinate = [3, 4]

    domUi.playTurn(coordinate)

    const computerAttacks =
        domUi.ui.playerBoard.missedAttacks.length +
        domUi.ui.playerBoard.hitAttacks.length

    expect(computerAttacks).toBe(1)
})
test(`playTurn returns the turn to the human player`, () => {
    const domUi = DomUi()

    domUi.playTurn([3, 4])

    expect(domUi.currentPlayer.type).toBe("human")
})
test(`playTurn attacks the opponent board`, () => {
    const domUi = DomUi()

    domUi.playTurn([3, 4])

    const opponentAttacks =
        domUi.ui.opponentBoard.missedAttacks.length +
        domUi.ui.opponentBoard.hitAttacks.length

    expect(opponentAttacks).toBe(1)
})
test(`DomUi starts with no selected ship`, () => {
    const ui = DomUi()

    expect(ui.selectedShip).toBeNull()
})
test(`selectShip selects a ship for placement`, () => {
    const ui = DomUi()

    const ship = Ship(3)

    const selectedShip = ui.selectShip(ship)

    expect(selectedShip).toBe(ship)
    expect(ui.selectedShip).toBe(ship)
})
test(`DomUi creates a fleet for the human player`, () => {
    const ui = DomUi()

    expect(ui.playerFleet).toHaveLength(5)
    expect(ui.playerFleet.map(ship => ship.length))
        .toEqual([5, 4, 3, 3, 2])
})
test(`DomUi renders one selection button for each ship`, () => {
    const ui = DomUi()

    ui.renderFleet()

    expect(ui.fleetContainer.children).toHaveLength(5)
})
test(`clicking a ship button selects that ship`, () => {
    const ui = DomUi()

    ui.renderFleet()

    const firstShip = ui.playerFleet[0]

    ui.fleetContainer.children[0].click()

    expect(ui.selectedShip).toBe(firstShip)
})
test(`clicking a player board cell places the selected ship`, () => {
    const ui = DomUi()

    const ship = ui.playerFleet[0]

    ui.selectShip(ship)
    ui.boardContainer.children[0].click()

    expect(ui.ui.playerBoard.ships[0].ship).toBe(ship)
})
test(`placing a ship removes it from available ships`, () => {
    const ui = DomUi()

    const ship = ui.playerFleet[0]

    ui.selectShip(ship)
    ui.boardContainer.children[0].click()

    expect(ui.availableShips).not.toContain(ship)
    expect(ui.fleetContainer.children).toHaveLength(4)
})
test(`invalid ship placement keeps the ship available`, () => {
    const ui = DomUi()

    const ship = ui.playerFleet[0]

    ui.selectShip(ship)
    ui.changePlaceShipDirection()

    ui.boardContainer.children[32].click()

    expect(ui.availableShips).toContain(ship)
    expect(ui.ui.playerBoard.ships).toHaveLength(0)
})
test(`DomUi reports that setup is incomplete when ships remain`, () => {
    const ui = DomUi()

    expect(ui.isSetupComplete()).toBe(false)
})

test(`DomUi reports setup complete when all ships are placed`, () => {
    const ui = DomUi()

    const placements = [
        [ui.playerFleet[0], [0, 0]],
        [ui.playerFleet[1], [2, 0]],
        [ui.playerFleet[2], [4, 0]],
        [ui.playerFleet[3], [6, 0]],
        [ui.playerFleet[4], [7, 6]],
    ]

    placements.forEach(([ship, coordinate]) => {
        ui.selectShip(ship)

        const cellIndex =
            coordinate[0] * 8 + coordinate[1]

        ui.boardContainer.children[cellIndex].click()
    })

    expect(ui.availableShips).toHaveLength(0)
    expect(ui.isSetupComplete()).toBe(true)
})
test(`clicking an opponent cell does not start the game before setup is complete`, () => {
    const ui = DomUi()

    ui.opponentBoardContainer.children[0].click()

    const playerBoard =
        ui.ui.gameController.player1.board

    expect(playerBoard.missedAttacks).toHaveLength(0)
    expect(playerBoard.hitAttacks).toHaveLength(0)
})
test(`DomUi() sets up the computer fleet`, () => {
    const ui = DomUi()

    expect(ui.ui.opponentBoard.ships).toHaveLength(5)
})

test(`DomUi() sets up computer ships with the correct lengths`, () => {
    const ui = DomUi()

    expect(
        ui.ui.opponentBoard.ships.map(ship => ship.ship.length)
    ).toEqual([5, 4, 3, 3, 2])
})

test(`DomUi() sets up computer ships without overlapping`, () => {
    const ui = DomUi()

    const coordinates =
        ui.ui.opponentBoard.ships.flatMap(
            ship => ship.coordinates
        )

    const uniqueCoordinates = new Set(
        coordinates.map(coordinate => coordinate.join(","))
    )

    expect(uniqueCoordinates.size).toBe(coordinates.length)
})




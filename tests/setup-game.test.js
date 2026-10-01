import { Gameboard } from "../src/gameboard"
import { setupComputerFleet } from "../src/setup-game"

test(`setupComputerFleet places five ships`, () => {
    const board = Gameboard()

    setupComputerFleet(board)

    expect(board.ships).toHaveLength(5)
})
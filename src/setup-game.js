import { createFleet } from "./fleet"

export function setupComputerFleet(board) {
    const fleet = createFleet()

    const placements = [
        [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
        [[2, 1], [3, 1], [4, 1], [5, 1]],
        [[2, 4], [2, 5], [2, 6]],
        [[5, 4], [6, 4], [7, 4]],
        [[6, 6], [6, 7]],
    ]

    fleet.forEach((ship, index) => {
        board.placeShip(ship, placements[index])
    })
}
import { Gameboard } from "./gameboard";

export function Player(type) {
    let board = Gameboard()
    let attackedCoordinates = []

    function attackOpponent(opponentBoard, coordinate) {
        return opponentBoard.receiveAttack(coordinate)
    }

    function getRandomAttack() {
        let coordinate

        do {
            coordinate = [
                Math.floor(Math.random() * 8),
                Math.floor(Math.random() * 8)
            ]
        } while (
            attackedCoordinates.some(attackedCoordinate =>
                attackedCoordinate[0] === coordinate[0] &&
                attackedCoordinate[1] === coordinate[1]
            )
        )

        return coordinate
    }

    function recordAttack(coordinate) {
        attackedCoordinates.push(coordinate)
    }

    return {
        board,
        attackOpponent,
        type,
        getRandomAttack,
        recordAttack,
    }
}
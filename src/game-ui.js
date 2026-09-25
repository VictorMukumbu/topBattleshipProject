import { GameController } from "./game-controller.js"

export function GameUi(){
    let gameController = GameController()
    let playerBoard = gameController.player1.board
    let opponentBoard = gameController.player2.board

    function renderBoard(board){

        let cells = Array.from({ length: 64 }, (_, index) => {
            let row = Math.floor(index / 8)
            let column = index % 8

            let ship = board.ships.find(ship =>
                ship.coordinates.some(coordinate =>
                    coordinate[0] === row &&
                    coordinate[1] === column
                )
            )

            let occupied = ship !== undefined
            let hit = ship !== undefined && ship.ship.hits > 0

            let missed = board.missedAttacks.some(coordinate =>
                coordinate[0] === row &&
                coordinate[1] === column
            )

            return {
                coordinate: [row, column],
                occupied,
                hit,
                missed
            }
        })

        return {
            ships: board.ships,
            missedAttacks: board.missedAttacks,
            cells,
        }
    }

    return {
        gameController,
        playerBoard,
        opponentBoard,
        renderBoard,
        isGameOver: gameController.isGameOver,
        currentPlayer: gameController.currentPlayer,
    }
}

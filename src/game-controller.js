import { Player } from "./player";

export function GameController() {
    let player1 = Player("human")
    let player2 = Player("computer")

    let currentPlayer = player1

    function changeCurrentPlayer() {
        if (currentPlayer === player1) {
            return currentPlayer = player2
        }

        if (currentPlayer === player2) {
            return currentPlayer = player1
        }
    }

    function isGameOver() {
        if (currentPlayer === player1) {
            return player2.board.allShipsSunk()
        }

        if (currentPlayer === player2) {
            return player1.board.allShipsSunk()
        }
    }

    function controllerAttack(coordinate) {
        if (currentPlayer === player1) {
            return currentPlayer.attackOpponent(
                player2.board,
                coordinate
            )
        }

        if (currentPlayer === player2) {
            return currentPlayer.attackOpponent(
                player1.board,
                coordinate
            )
        }
    }

    function computerAttack() {
        if (currentPlayer !== player2) {
            return
        }

        const coordinate = player2.getRandomAttack()

        const result = controllerAttack(coordinate)

        player2.recordAttack(coordinate)

        return result
    }

    return {
        player1,
        player2,

        get currentPlayer() {
            return currentPlayer
        },

        changeCurrentPlayer,
        isGameOver,
        controllerAttack,
        computerAttack,
    }
}
import {GameController} from "./game-controller.js"

export function GameUi(){
    let gameController = GameController()
    let playerBoard = gameController.player1.board
    let opponentBoard = gameController.player2.board

    return {
        gameController,
        playerBoard,
        opponentBoard,
    }
}
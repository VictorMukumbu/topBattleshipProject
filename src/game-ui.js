import {GameController} from "./game-controller.js"

export function GameUi(){
    let gameController = GameController()
    let playerBoard = gameController.player1.board
    let opponentBoard = gameController.player2.board

    function renderBoard(board){
        return{
            ships: board.ships,
            missedAttacks: board.missedAttacks,
            cells: Array.from({ length: 64 })

        }
    }

    return {
        gameController,
        playerBoard,
        opponentBoard,
        renderBoard,
    }
}
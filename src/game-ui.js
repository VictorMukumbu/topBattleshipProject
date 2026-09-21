import {GameController} from "./game-controller.js"

export function GameUi(){
    let gameController = GameController()
    let playerBoard = gameController.player1.board
    let opponentBoard = gameController.player2.board

    function renderBoard(board){
        
        let cells = Array.from({ length: 64 }, (_, index) => {
            let row = Math.floor(index / 8)
            let column = index % 8

            return [row, column]
        })
        return{
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
    }
}
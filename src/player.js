import { Gameboard } from "./gameboard";
export function Player(){
    let board = Gameboard()

    function attackOpponent(opponentBoard,coordinate){
        return opponentBoard.receiveAttack(coordinate)
    }

    return {
        board,
        attackOpponent,
    }
}
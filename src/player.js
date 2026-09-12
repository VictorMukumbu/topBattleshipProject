import { Gameboard } from "./gameboard";
export function Player(type){
    let board = Gameboard()

    function attackOpponent(opponentBoard,coordinate){
        return opponentBoard.receiveAttack(coordinate)
    }

    return {
        board,
        attackOpponent,
        type,
    }
}
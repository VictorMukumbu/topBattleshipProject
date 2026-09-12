import { Player } from "./player";
import { Gameboard } from "./gameboard";
export function GameController(){
    let player1 =Player("human")
    let player2 =Player("computer")

    let currentPlayer =player1

    function changeCurrentPlayer(){
        if(currentPlayer ===player1){
            return currentPlayer =player2
        }
        if(currentPlayer ===player2){
            return currentPlayer = player1
        }
        return
    }

    function isGameOver(){
        if(currentPlayer===player1){
            return player2.board.allShipsSunk()
        }
        if(currentPlayer === player2){
            return player1.board.allShipsSunk()
        }        
    }

    function controllerAttack(coordinate){
        if(currentPlayer ===player1){
             return currentPlayer.attackOpponent(player2.board,coordinate)
        }
        if(currentPlayer ===player2){
            return currentPlayer.attackOpponent(player1.board,coordinate)
        }
    }

    return{
        player1,
        player2,
        get currentPlayer(){
            return currentPlayer
        },
        changeCurrentPlayer,
        isGameOver,
        controllerAttack,
    }
}
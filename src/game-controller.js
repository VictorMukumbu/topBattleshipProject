import { Player } from "./player";

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

    return{
        player1,
        player2,
        get currentPlayer(){
            return currentPlayer
        },
        changeCurrentPlayer,
    }
}
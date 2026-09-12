import { Player } from "./player";

export function GameController(){
    let player1 =Player("human")
    let player2 =Player("computer")

    let currentPlayer =player1

    return{
        player1,
        player2,
        currentPlayer,
    }
}
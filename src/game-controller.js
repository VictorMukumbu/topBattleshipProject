import { Player } from "./player";

export function GameController(){
    let player1 =Player("human")
    let player2 =Player("computer")

    return{
        player1,
        player2,
    }
}
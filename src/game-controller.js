import { Player } from "./player";

export function GameController(){
    let player1 =Player()
    let player2 =Player()

    return{
        player1,
        player2,
    }
}
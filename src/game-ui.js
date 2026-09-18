import {GameController} from "./game-controller.js"

export function GameUi(){
    let gameController = GameController()

    return {gameController}
}
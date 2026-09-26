import { GameUi } from "./game-ui";
export function DomUi() {
    let gameUi = GameUi()
    let boardContainer = document.createElement("div")

    return{
        gameUi,
        boardContainer,
    }

}
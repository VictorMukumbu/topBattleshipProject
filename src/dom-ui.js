import { GameUi } from "./game-ui";
export function DomUi() {
    let gameUi = GameUi()
    let boardContainer = document.createElement("div")
    boardContainer.classList.add("board")

    return{
        gameUi,
        boardContainer,
    }

}
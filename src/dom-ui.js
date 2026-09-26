import { GameUi } from "./game-ui";
export function DomUi() {
    let ui = GameUi()
    let boardContainer = document.createElement("div")
    boardContainer.classList.add("board")
    for(let i=0;i<64;i++){
        let cell = document.createElement("div")
        boardContainer.appendChild(cell)
    }

    return{
        ui,
        boardContainer,
    }

}
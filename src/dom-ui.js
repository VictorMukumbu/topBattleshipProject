import { GameUi } from "./game-ui";
export function DomUi() {
    let ui = GameUi()
    let boardContainer = document.createElement("div")
    boardContainer.classList.add("board")
    document.body.appendChild(boardContainer)
    for(let i=0;i<64;i++){
        let cell = document.createElement("div")
        boardContainer.appendChild(cell)
        cell.dataset.row =Math.floor(i/8)
        cell.dataset.column=Math.floor(i%8)
    }
    function renderBoard(board){
        let renderedBoard = ui.renderBoard(board)
        for(const cell of renderedBoard.cells){
            let coordinate = cell.coordinate
            let domCell = Array.from(boardContainer.children).find(domCell =>
                domCell.dataset.row === String(coordinate[0]) &&
                domCell.dataset.column === String(coordinate[1])
            )
           if(cell.occupied){
                domCell.classList.add("ship")
           } 
           if (cell.missed) { 
                domCell.classList.add("missed") 
            }
            if (cell.hit) {
                domCell.classList.add("hit")
            }
        }
    }

    return{
        ui,
        boardContainer,
        renderBoard,
    }

}
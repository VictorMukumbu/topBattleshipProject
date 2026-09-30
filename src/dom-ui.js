import { GameUi } from "./game-ui";
export function DomUi() {
    let ui = GameUi()

    let boardContainer = document.createElement("div")
    let opponentBoardContainer = document.createElement("div")
    
    boardContainer.classList.add("board")
    opponentBoardContainer.classList.add("board")

    document.body.appendChild(boardContainer)
    document.body.appendChild(opponentBoardContainer)

    for(let i=0;i<64;i++){
        let cell = document.createElement("div")
        let opponentCell = document.createElement("div")

        cell.classList.add("cell")
        opponentCell.classList.add("cell")

        boardContainer.appendChild(cell)
        opponentBoardContainer.appendChild(opponentCell)

        cell.dataset.row =Math.floor(i/8)
        cell.dataset.column=Math.floor(i%8)

        opponentCell.dataset.row =Math.floor(i/8)
        opponentCell.dataset.column=Math.floor(i%8)
        opponentCell.addEventListener("click", () => {
            ui.attack([
                Number(opponentCell.dataset.row),
                Number(opponentCell.dataset.column)
            ])
            renderBoard(ui.opponentBoard)
        })
    }
    function renderBoard(board){
        let renderedBoard = ui.renderBoard(board)

        let container
        if (board === ui.playerBoard) {
            container = boardContainer
        }
        if (board === ui.opponentBoard) {
            container = opponentBoardContainer
        }

        for(const cell of renderedBoard.cells){
            let coordinate = cell.coordinate
            let domCell = Array.from(container.children).find(domCell =>
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
        opponentBoardContainer,
        renderBoard,
        get currentPlayer(){
            return ui.currentPlayer
        },
        changeCurrentPlayer(){
            return ui.changeCurrentPlayer()
        },
    }

}
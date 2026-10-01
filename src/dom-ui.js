import { GameUi } from "./game-ui";
import { placeShipLogic } from "./ship-placement";

export function DomUi() {
    let ui = GameUi()

    let placeShipDirection = "horizontal"
    let selectedStartCoordinate = null

    let boardContainer = document.createElement("div")
    let opponentBoardContainer = document.createElement("div")

    boardContainer.classList.add("board")
    opponentBoardContainer.classList.add("board")

    document.body.appendChild(boardContainer)
    document.body.appendChild(opponentBoardContainer)

    for (let i = 0; i < 64; i++) {
        let cell = document.createElement("div")
        let opponentCell = document.createElement("div")

        cell.classList.add("cell")
        opponentCell.classList.add("cell")

        boardContainer.appendChild(cell)
        opponentBoardContainer.appendChild(opponentCell)

        cell.dataset.row = Math.floor(i / 8)
        cell.dataset.column = Math.floor(i % 8)

        opponentCell.dataset.row = Math.floor(i / 8)
        opponentCell.dataset.column = Math.floor(i % 8) 
        
        cell.addEventListener("click", () => {
            selectedStartCoordinate = [
                Number(cell.dataset.row),
                Number(cell.dataset.column)
            ]
        })

        opponentCell.addEventListener("click", () => {
            ui.attack([
                Number(opponentCell.dataset.row),
                Number(opponentCell.dataset.column)
            ])

            renderBoard(ui.opponentBoard)

            if (ui.isGameOver()) {
                return
            }

            ui.changeCurrentPlayer()

            computerAttack()

            ui.changeCurrentPlayer()
        })
    }

    function renderBoard(board) {
        let renderedBoard = ui.renderBoard(board)

        let container

        if (board === ui.playerBoard) {
            container = boardContainer
        }

        if (board === ui.opponentBoard) {
            container = opponentBoardContainer
        }

        for (const cell of renderedBoard.cells) {
            let coordinate = cell.coordinate

            let domCell = Array.from(container.children).find(domCell =>
                domCell.dataset.row === String(coordinate[0]) &&
                domCell.dataset.column === String(coordinate[1])
            )

            if (cell.occupied) {
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

    function placeShip(ship, 
        startCoordinate=selectedStartCoordinate,
        direction=placeShipDirection) {
        const occupiedCoordinates = ui.playerBoard.ships.flatMap(
            shipEntry => shipEntry.coordinates
        )

        const coordinates = placeShipLogic(
            startCoordinate,
            ship.length,
            direction,
            occupiedCoordinates
        )

        if (coordinates === "invalid") {
            return "invalid"
        }

       ui.playerBoard.placeShip(ship, coordinates)
        selectedStartCoordinate = null
        renderBoard(ui.playerBoard)

        return coordinates
    }

    function computerAttack() {
        let row
        let column

        do {
            row = Math.floor(Math.random() * 8)
            column = Math.floor(Math.random() * 8)
        } while (
            [...ui.playerBoard.missedAttacks, ...ui.playerBoard.hitAttacks]
                .some(coordinate =>
                    coordinate[0] === row &&
                    coordinate[1] === column
                )
        )

        ui.attack([row, column])
        renderBoard(ui.playerBoard)
    }

    function changePlaceShipDirection() {
        if (placeShipDirection === "horizontal") {
            placeShipDirection = "vertical"
        } else {
            placeShipDirection = "horizontal"
        }

        return placeShipDirection
    }

    return {
        ui,
        boardContainer,
        opponentBoardContainer,
        renderBoard,
        placeShip,
        get currentPlayer() {
            return ui.currentPlayer
        },
        changeCurrentPlayer() {
            return ui.changeCurrentPlayer()
        },
        get placeShipDirection() {
            return placeShipDirection
        },
        changePlaceShipDirection,
        get startCoordinate() {
            return selectedStartCoordinate
        }
    }
}
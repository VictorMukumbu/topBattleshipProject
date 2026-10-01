import { GameUi } from "./game-ui";
import { placeShipLogic } from "./ship-placement";

export function DomUi() {
    const ui = GameUi()

    let placeShipDirection = "horizontal"
    let selectedStartCoordinate = null

    let boardContainer =
        document.querySelector("#player-board") ||
        document.createElement("div")

    let opponentBoardContainer =
        document.querySelector("#opponent-board") ||
        document.createElement("div")

    boardContainer.classList.add("board")
    opponentBoardContainer.classList.add("board")

    let directionButton = document.createElement("button")

    directionButton.textContent = "Vertical"

    if (!directionButton.parentElement) {
        document.body.appendChild(directionButton)
    }

    function changePlaceShipDirection() {
        if (placeShipDirection === "horizontal") {
            placeShipDirection = "vertical"
        } else {
            placeShipDirection = "horizontal"
        }

        return placeShipDirection
    }

    directionButton.addEventListener("click", () => {
        changePlaceShipDirection()

        directionButton.textContent =
            placeShipDirection === "horizontal"
                ? "Vertical"
                : "Horizontal"
    })

    function renderBoard(board) {
        let container =
            board === ui.playerBoard
                ? boardContainer
                : opponentBoardContainer

        container.innerHTML = ""

        const renderedBoard = ui.renderBoard(board)

        renderedBoard.cells.forEach(cellData => {
            const cell = document.createElement("button")

            cell.classList.add("cell")

            cell.dataset.row = cellData.coordinate[0]
            cell.dataset.column = cellData.coordinate[1]

            if (cellData.occupied) {
                cell.classList.add("ship")
            }

            if (cellData.hit) {
                cell.classList.add("hit")
            }

            if (cellData.missed) {
                cell.classList.add("missed")
            }

            if (board === ui.playerBoard) {
                cell.addEventListener("click", () => {
                    selectedStartCoordinate = [
                        Number(cell.dataset.row),
                        Number(cell.dataset.column)
                    ]
                })
            }

            if (board === ui.opponentBoard) {
                cell.addEventListener("click", () => {
                    if (ui.isGameOver()) {
                        return
                    }

                    const coordinate = [
                        Number(cell.dataset.row),
                        Number(cell.dataset.column)
                    ]

                    playTurn(coordinate)
                })
            }

            container.appendChild(cell)
        })

        if (!container.parentElement) {
            document.body.appendChild(container)
        }

        return renderedBoard
    }

    function renderBoards() {
        renderBoard(ui.playerBoard)
        renderBoard(ui.opponentBoard)
    }

    function playTurn(coordinate) {
        ui.attack(coordinate)

        if (ui.isGameOver()) {
            renderBoards()
            return
        }

        ui.changeCurrentPlayer()

        ui.computerAttack()

        if (ui.isGameOver()) {
            renderBoards()
            return
        }

        ui.changeCurrentPlayer()

        renderBoards()
    }

    function placeShip(
        ship,
        startCoordinate = selectedStartCoordinate,
        direction = placeShipDirection
    ) {
        const occupiedCoordinates =
            ui.playerBoard.ships.flatMap(
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

    // Initial rendering.
    renderBoards()

    return {
        ui,
        boardContainer,
        opponentBoardContainer,
        directionButton,

        renderBoard,
        renderBoards,
        placeShip,
        playTurn,

        get currentPlayer() {
            return ui.currentPlayer
        },

        changeCurrentPlayer() {
            return ui.changeCurrentPlayer()
        },

        get placeShipDirection() {
            return placeShipDirection
        },

        get startCoordinate() {
            return selectedStartCoordinate
        },

        changePlaceShipDirection,
    }
}
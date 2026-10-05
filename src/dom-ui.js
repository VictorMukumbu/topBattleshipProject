import { GameUi } from "./game-ui.js";
import { placeShipLogic } from "./ship-placement.js";
import { createFleet } from "./fleet.js";
import { setupComputerFleet } from "./setup-game.js";

export function DomUi() {
    const ui = GameUi()
    setupComputerFleet(ui.opponentBoard)

    const playerFleet = createFleet()
    let availableShips = [...playerFleet]

    let placeShipDirection = "horizontal"
    let selectedStartCoordinate = null
    let selectedShip = null

    let boardContainer =
        document.querySelector("#player-board") ||
        document.createElement("div")

    let opponentBoardContainer =
        document.querySelector("#opponent-board") ||
        document.createElement("div")

    boardContainer.classList.add("board")
    opponentBoardContainer.classList.add("board")

    let directionButton =
    document.querySelector("#direction-button") ||
    document.createElement("button")
    directionButton.textContent = "Vertical"
    if (!directionButton.parentElement) {
        document.body.appendChild(directionButton)
    }

    let fleetContainer =
    document.querySelector("#fleet") ||
    document.createElement("div")

    fleetContainer.classList.add("fleet")

    if (!fleetContainer.parentElement) {
        document.body.appendChild(fleetContainer)
    }

    let gameStatus =  document.querySelector("#game-status") ||
     document.createElement("div")
    gameStatus.classList.add("game-status")
    if (!gameStatus.parentElement) {
        document.body.appendChild(gameStatus)
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

    function selectShip(ship) {
        selectedShip = ship
        return selectedShip
    }

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

                    if (selectedShip !== null) {
                        placeShip(selectedShip)
                    }
                })
            }

            if (board === ui.opponentBoard) {
                cell.addEventListener("click", () => {
                    if (!isSetupComplete()) {
                        return
                    }

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

    function renderFleet() {
        fleetContainer.innerHTML = ""

        availableShips.forEach((ship, index) => {
            const button = document.createElement("button")

            button.classList.add("ship-selection")
            button.dataset.shipIndex = index
            button.textContent = `Ship ${ship.length}`

        button.addEventListener("click", () => {
            selectShip(ship)

            document
                .querySelectorAll(".ship-selection")
                .forEach(button => {
                    button.classList.remove("selected")
                })

            button.classList.add("selected")
        })


            fleetContainer.appendChild(button)
        })

        return fleetContainer
    }

    function playTurn(coordinate) {
        ui.attack(coordinate)

        if (ui.isGameOver()) {
            renderBoards()
            renderGameStatus()
            return
        }

        ui.changeCurrentPlayer()

        ui.computerAttack()

        if (ui.isGameOver()) {
            renderBoards()
            renderGameStatus()
            return
        }

        ui.changeCurrentPlayer()

        renderBoards()
        renderGameStatus()
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

        availableShips = availableShips.filter(
            availableShip => availableShip !== ship
        )

        selectedShip = null
        selectedStartCoordinate = null

        renderBoard(ui.playerBoard)
        renderFleet()
        renderGameStatus()

        return coordinates
    }

    function isSetupComplete() {
        return availableShips.length === 0
    }

    function renderGameStatus() {
        if (!isSetupComplete()) {
            gameStatus.textContent = "Place all your ships."
            return
        }

        if (ui.isGameOver()) {
            gameStatus.textContent = "Game over!"
            return
        }

        gameStatus.textContent = "Your turn."
    }

    // Initial rendering.
    renderBoards()
    renderFleet()
    renderGameStatus()

    return {
        ui,
        boardContainer,
        opponentBoardContainer,
        directionButton,
        fleetContainer,

        renderBoard,
        renderBoards,
        renderFleet,
        placeShip,
        playTurn,

        selectShip,

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

        get selectedShip() {
            return selectedShip
        },

        playerFleet,

        get availableShips() {
            return availableShips
        },

        changePlaceShipDirection,
        isSetupComplete,
        gameStatus,
        renderGameStatus,
    }
}

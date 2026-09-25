
import { GameUi } from "../src/game-ui"
import { Ship } from "../src/ship"

test(`calling GameUi accesses a GameController`,()=>{
    expect(Object.hasOwn(GameUi(),"gameController")).toBe(true)
})

test(`GameUi() provides access to both boards.`,()=>{
    expect(Object.hasOwn(GameUi(),"playerBoard")).toBe(true)
    expect(Object.hasOwn(GameUi(),"opponentBoard")).toBe(true)
})

test(`GameUi() provides a renderBoard function.`,()=>{
    expect(Object.hasOwn(GameUi(),"renderBoard")).toBe(true)
})

test(`renderBoard() returns board rendering data.`,()=>{
    const ui = GameUi()
    const renderedBoard = ui.renderBoard(ui.playerBoard)

    expect(Object.hasOwn(renderedBoard, "ships")).toBe(true)
})

test(`renderBoard() returns the board's missed attacks.`,()=>{
    const ui = GameUi()
    const renderedBoard = ui.renderBoard(ui.playerBoard)

    expect(Object.hasOwn(renderedBoard, "missedAttacks")).toBe(true)
})

test(`renderBoard() returns ship coordinates.`,()=>{
    const ui = GameUi()

    const ship = {
        coordinates: [[2, 3], [2, 4], [2, 5]]
    }

    ui.playerBoard.placeShip(ship, ship.coordinates)

    const renderedBoard = ui.renderBoard(ui.playerBoard)

    expect(renderedBoard.ships[0].coordinates).toEqual(ship.coordinates)
})

test(`renderBoard() returns missed attack coordinates.`,()=>{
    const ui = GameUi()

    const coordinate = [3, 4]

    ui.playerBoard.receiveAttack(coordinate)

    const renderedBoard = ui.renderBoard(ui.playerBoard)

    expect(renderedBoard.missedAttacks).toContain(coordinate)
})

test(`renderBoard() creates 64 cells for a board.`,()=>{
    const ui = GameUi()

    const renderedBoard = ui.renderBoard(ui.playerBoard)

    expect(renderedBoard.cells).toHaveLength(64)
})

test(`renderBoard() gives each cell a coordinate.`,()=>{
    const ui = GameUi()

    const renderedBoard = ui.renderBoard(ui.playerBoard)

    expect(renderedBoard.cells[0].coordinate).toEqual([0, 0])
    expect(renderedBoard.cells[63].coordinate).toEqual([7, 7])
})

test(`renderBoard() identifies cells occupied by ships.`,()=>{
    const ui = GameUi()

    const ship = {
        coordinates: [[2, 3], [2, 4], [2, 5]]
    }

    ui.playerBoard.placeShip(ship, ship.coordinates)

    const renderedBoard = ui.renderBoard(ui.playerBoard)

    expect(renderedBoard.cells[19].occupied).toBe(true)
})

test(`renderBoard() identifies unoccupied cells.`,()=>{
    const ui = GameUi()

    const renderedBoard = ui.renderBoard(ui.playerBoard)

    expect(renderedBoard.cells[0].occupied).toBe(false)
})

test(`renderBoard() identifies cells occupied by hit ships.`,()=>{
    const ui = GameUi()

    const ship = Ship(3)
    ship.hit()

    ui.playerBoard.placeShip(ship, [[2, 3], [2, 4], [2, 5]])

    const renderedBoard = ui.renderBoard(ui.playerBoard)

    expect(renderedBoard.cells[19].hit).toBe(true)
})

test(`renderBoard() identifies missed cells.`,()=>{
    const ui = GameUi()

    ui.playerBoard.receiveAttack([3, 4])

    const renderedBoard = ui.renderBoard(ui.playerBoard)

    expect(renderedBoard.cells[28].missed).toBe(true)
})

test(`renderBoard() identifies cells that were not missed.`,()=>{
    const ui = GameUi()

    const renderedBoard = ui.renderBoard(ui.playerBoard)

    expect(renderedBoard.cells[0].missed).toBe(false)
})

test(`renderBoard() can render the opponent board.`,()=>{
    const ui = GameUi()

    const renderedBoard = ui.renderBoard(ui.opponentBoard)

    expect(renderedBoard.cells).toHaveLength(64)
})
test(`GameUi() provides access to the game-over state.`,()=>{
    const ui = GameUi()

    expect(Object.hasOwn(ui, "isGameOver")).toBe(true)
})
test(`GameUi() provides access to the current player.`,()=>{
    const ui = GameUi()

    expect(Object.hasOwn(ui, "currentPlayer")).toBe(true)
})
test(`GameUi() provides an attack function.`,()=>{
    const ui = GameUi()

    expect(Object.hasOwn(ui, "attack")).toBe(true)
})
test(`GameUi() provides a change player function.`,()=>{
    const ui = GameUi()

    expect(Object.hasOwn(ui, "changeCurrentPlayer")).toBe(true)
})
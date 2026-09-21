import { GameUi } from "../src/game-ui"
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
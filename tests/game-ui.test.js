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
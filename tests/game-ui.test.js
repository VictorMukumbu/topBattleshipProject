import { GameUi } from "../src/game-ui"
test(`calling GameUi accesses a GameController`,()=>{
    expect(Object.hasOwn(GameUi(),"gameController")).toBe(true)
})
test(`GameUi() provides access to both boards.`,()=>{
    expect(Object.hasOwn(GameUi(),"playerBoard")).toBe(true)
    expect(Object.hasOwn(GameUi(),"opponentBoard")).toBe(true)
})
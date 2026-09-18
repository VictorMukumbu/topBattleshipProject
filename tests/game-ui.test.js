import { GameUi } from "../src/game-ui"
test(`calling GameUi accesses a GameController`,()=>{
    expect(Object.hasOwn(GameUi(),"gameController")).toBe(true)
})
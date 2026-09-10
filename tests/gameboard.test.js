import { Gameboard } from "../src/gameboard.js";

test('Gameboard() actually creates a board',()=>{
    let board = Gameboard()
    expect(board.ships).toEqual([])
})
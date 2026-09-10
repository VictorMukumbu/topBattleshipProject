import { Gameboard } from "../src/gameboard.js";
import { Ship } from "../src/ship.js";

test('Gameboard() actually creates a board',()=>{
    let board = Gameboard()
    expect(board.ships).toEqual([])
})
test('Gameboard should be able to place ships at specific coordinates',()=>{
    let board =Gameboard()
    let ship =Ship(3)
    let coordinates = [[0, 0], [0, 1], [0, 2]]
    let expectedShips ={
        ship:ship,
        coordinates:coordinates
    }
    board.placeShip(ship, coordinates)
    expect(board.ships.length).toBe(1)
    expect(board.ships[0]).toEqual(expectedShips)
})

test('Gameboard should be able to receive an attack  at a coordinate and determine whether a ship was hit',()=>{
    let ship =Ship(3)
    let board =Gameboard()
    let coordinates = [[0, 0], [0, 1], [0, 2]]

    board.placeShip(ship,coordinates) //placeShip on board
    
    board.receiveAttack(coordinates[0]) //attackboard

    expect(ship.hits).toBe(1)
})
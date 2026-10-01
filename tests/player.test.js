import { Gameboard } from "../src/gameboard"
import { Player } from "../src/player.js"
import { Ship } from "../src/ship.js"

test(`Calling Player() 
    should create an object that has a gameboard`,()=>{
        let player =Player()
        

        expect(typeof(player.board)).toBe("object")
    })
test(`When a Player attacks an opponent's Gameboard at
     a coordinate, that Gameboard should receive 
     the attack.`,()=>{
        let player =Player()
        let opponent = Player()
        let ship =Ship(3)
        let coordinates = [[0, 0], [0, 1], [0, 2]]

        opponent.board.placeShip(ship,coordinates) //placeShip on board
        
        player.attackOpponent(opponent.board,coordinates[0]) //attackboard

        expect(ship.hits).toBe(1)
     })
test(`Calling Player() for a computer player 
    should create a player that can be identified 
    as a computer player.`,()=>{
        let computerPlayer = Player('computer')
        expect(computerPlayer.type).toBe("computer")
    })
test(`computer player generates a valid coordinate`, () => {
    const computer = Player("computer")

    const coordinate = computer.getRandomAttack()

    expect(coordinate).toHaveLength(2)
    expect(coordinate[0]).toBeGreaterThanOrEqual(0)
    expect(coordinate[0]).toBeLessThan(8)
    expect(coordinate[1]).toBeGreaterThanOrEqual(0)
    expect(coordinate[1]).toBeLessThan(8)
})

test(`computer player does not repeat an attacked coordinate`, () => {
    const computer = Player("computer")

    const firstCoordinate = computer.getRandomAttack()

    computer.recordAttack(firstCoordinate)

    let secondCoordinate

    do {
        secondCoordinate = computer.getRandomAttack()
    } while (
        secondCoordinate[0] === firstCoordinate[0] &&
        secondCoordinate[1] === firstCoordinate[1]
    )

    expect(secondCoordinate).not.toEqual(firstCoordinate)
})    
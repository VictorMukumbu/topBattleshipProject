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
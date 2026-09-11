import { Gameboard } from "../src/gameboard"
import { Player } from "../src/player.js"

test(`Calling Player() 
    should create an object that has a gameboard`,()=>{
        let player =Player()

        expect(typeof(player.gameboard)).toBe("object")
    })
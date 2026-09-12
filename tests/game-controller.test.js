import { GameController } from "../src/game-controller"
test(`calling GameController() creates an object 
    containing two players`,()=>{
        let gameController =GameController()
        expect(Object.hasOwn(gameController, 'player1')).toBe(true)
        expect(Object.hasOwn(gameController, 'player2')).toBe(true)
    })
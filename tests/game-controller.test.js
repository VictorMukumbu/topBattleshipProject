import { GameController } from "../src/game-controller"
test(`calling GameController() creates an object 
    containing two players`,()=>{
        let gameController =GameController()
        expect(Object.hasOwn(gameController, 'player1')).toBe(true)
        expect(Object.hasOwn(gameController, 'player2')).toBe(true)
    })
test(`theres one human player and one computer player`,()=>{
    let gameController =GameController()
    expect(gameController.player1.type).toBe("human")
    expect(gameController.player2.type).toBe("computer")
})
test(`When GameController() is created,
     player1 should be the current player`,()=>{
        let gameController =GameController()
        expect(gameController.currentPlayer).toBe(gameController.player1)
     })
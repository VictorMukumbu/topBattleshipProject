import { GameController } from "../src/game-controller"
import { Ship } from "../src/ship"
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
test(`GameController should be able to switch
     the current player from player1 to player2`,()=>{
        let gameController =GameController()
        gameController.changeCurrentPlayer()
        expect(gameController.currentPlayer).toBe(gameController.player2)
     })
test(`GameController can report that the
     game is over when all of the opponent's ships 
     have been sunk.`,()=>{
        let gameController = GameController()
        let coordinates =[[0,1]]

        let ship =Ship(1)

        gameController.player2.board.placeShip(ship,coordinates) //placeShip on board
        
        gameController.player1.attackOpponent(gameController.player2.board,coordinates[0]) //attackboard

        expect(gameController.isGameOver()).toBe(true)
     })

     test(`GameController can report that the game is not over
         when the opponent still has unsunk ships.`,()=>{
        let gameController = GameController()
        let coordinates =[[0,1],[1,2],[2,3]]

        let ship =Ship(3)

        gameController.player2.board.placeShip(ship,coordinates) //placeShip on board
        
        gameController.player1.attackOpponent(gameController.player2.board,coordinates[0]) //attackboard
        expect(gameController.isGameOver()).toBe(false)
        gameController.player1.attackOpponent(gameController.player2.board,coordinates[1]) //attackboard
        expect(gameController.isGameOver()).toBe(false)
        gameController.player1.attackOpponent(gameController.player2.board,coordinates[2]) //attackboard
        expect(gameController.isGameOver()).toBe(true)
     })
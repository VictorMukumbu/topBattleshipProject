import { placeShipLogic } from "../src/ship-placement"
test(`Given a starting coordinate, ship length, 
    and orientation, the placement logic should
     produce the coordinates occupied by that ship
     start: [2, 3]
     length: 3
     horizontal
     should produce [ [2,3], [2,4], [2,5] ]`,()=>{
        let length = 3
        let placeShipDirection = 'horizontal'

        expect(placeShipLogic([2,3],length,
            placeShipDirection)).toEqual([ [2,3], [2,4], [2,5] ])
     })
test(`vertical placement
     start: [2, 3]
     length: 3
     vertical
     should produce [ [2,3], [3,3], [4,3] ]`,()=>{
        let length = 3
        let placeShipDirection = 'vertical'

        expect(placeShipLogic([2,3],length,
            placeShipDirection)).toEqual(
                [ [2,3], [3,3], [4,3] ])
     })
test(`preventing a ship  from being placed 
    outside the 8×8 board horizontally`,()=>{
       let length = 3
       let placeShipDirection = 'horizontal'
       expect(placeShipLogic([2,6],length,
        placeShipDirection)).toBe("invalid") 
    })
test(`preventing a ship  from being placed 
    outside the 8×8 board vertically`,()=>{
       let length = 3
       let placeShipDirection = 'vertical'
       expect(placeShipLogic([6,2],length,
        placeShipDirection)).toBe("invalid") 
    })

test(`a ship cannot start outside the board`,()=>{
       let length = 3
       let placeShipDirection = 'vertical' ||"horizontal"
       expect(placeShipLogic([-1,2],length,
        placeShipDirection)).toBe("invalid") 
       expect(placeShipLogic([1,-2],length,
        placeShipDirection)).toBe("invalid")
       expect(placeShipLogic([-1,-2],length,
        placeShipDirection)).toBe("invalid")
    })

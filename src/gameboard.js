import { Ship } from "./ship"

export function Gameboard(){
    function placeShip(ship,coordinates){
        let expectedShips ={
            ship:ship,
            coordinates:coordinates,
        } 
        return this.ships.push(expectedShips)
    }
    function receiveAttack(coordinate) {
        for (const ship of this.ships){           
            let targetStr = coordinate.join(',');

            let hasMatch = ship.coordinates.some(coordinate => coordinate.join(',') === targetStr);

            if(hasMatch){
                return ship.ship.hit()
            }            
        }    
        return  this.missedAttacks.push(coordinate)
    }

    return{
        ships:[],
        placeShip,
        receiveAttack,
        missedAttacks:[],
    }
}
import { Ship } from "./ship.js"

export function Gameboard(){
    function placeShip(ship,coordinates){
        let expectedShips ={
            ship:ship,
            coordinates:coordinates,
        } 
        return this.ships.push(expectedShips)
    }
    function receiveAttack(coordinate) {
        const alreadyAttacked = [
                ...this.missedAttacks,
                ...this.hitAttacks
            ].some(attackedCoordinate =>
                attackedCoordinate[0] === coordinate[0] &&
                attackedCoordinate[1] === coordinate[1]
            )

            if (alreadyAttacked) {
                return
            }
        for (const ship of this.ships){           
            let targetStr = coordinate.join(',');

            let hasMatch = ship.coordinates.some(coordinate => coordinate.join(',') === targetStr);

            if(hasMatch){
                this.hitAttacks.push(coordinate)
                return ship.ship.hit()
            }            
        }    
        return  this.missedAttacks.push(coordinate)
    }

    function allShipsSunk(){
        return this.ships.every((ship)=>
            {
                return ship.ship.isSunk()===true
            })        
    }

    return{
        ships:[],
        placeShip,
        receiveAttack,
        missedAttacks:[],
        hitAttacks:[],
        allShipsSunk,
    }
}
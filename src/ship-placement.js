export function placeShipLogic(startCoordinate,length,placeShipDirection){
    if(placeShipDirection === "horizontal"){
        let computedCoordinates =[]
        let counter =0
        while(counter<length){
            computedCoordinates.push(
                [startCoordinate[0],(startCoordinate[1]+counter)]
            )
            counter++            
        }
        if(computedCoordinates[length-1][1]<8){
            return computedCoordinates
        }
        return "invalid" 
    }
    if(placeShipDirection === "vertical"){
        let computedCoordinates =[]
        let counter =0
        while(counter<length){
            computedCoordinates.push(
                [startCoordinate[0]+counter,(startCoordinate[1])]
            )
            counter++            
        } 
        return computedCoordinates              
    }
}
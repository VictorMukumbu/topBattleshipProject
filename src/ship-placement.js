export function placeShipLogic(
    startCoordinate,
    length,
    placeShipDirection,
    occupiedCoordinates = []
) {
    let computedCoordinates = []

    if(placeShipDirection !=="horizontal" 
        && placeShipDirection !== "vertical"){
            return "invalid"
        }
    if(length<=0 || length>8){
        return "invalid"
    }

    if (placeShipDirection === "horizontal") {
        let counter = 0

        while (counter < length) {
            computedCoordinates.push([
                startCoordinate[0],
                startCoordinate[1] + counter
            ])
            counter++
        }

        if (
            computedCoordinates[length - 1][1] >= 8 ||
            computedCoordinates[0][0] < 0 ||
            computedCoordinates[0][1] < 0 ||
            computedCoordinates[length - 1][0] >= 8
        ) {
            return "invalid"
        }
    }

    if (placeShipDirection === "vertical") {
        let counter = 0

        while (counter < length) {
            computedCoordinates.push([
                startCoordinate[0] + counter,
                startCoordinate[1]
            ])
            counter++
        }

        if (
            computedCoordinates[length - 1][0] >= 8 ||
            computedCoordinates[0][0] < 0 ||
            computedCoordinates[0][1] < 0 ||
            computedCoordinates[length - 1][1] >= 8
        ) {
            return "invalid"
        }
    }

    const overlaps = computedCoordinates.some(newCoordinate =>
        occupiedCoordinates.some(occupiedCoordinate =>
            newCoordinate[0] === occupiedCoordinate[0] &&
            newCoordinate[1] === occupiedCoordinate[1]
        )
    )

    if (overlaps) {
        return "invalid"
    }

    return computedCoordinates
}
import { Ship } from "./ship"

export function createFleet() {
    return [
        Ship(5),
        Ship(4),
        Ship(3),
        Ship(3),
        Ship(2),
    ]
}
import { Ship } from "../src/ship.js";

test('ship has correct length',()=>{
    const ship = Ship(3);
    expect(ship.length).toBe(3)
})
test('ship starts with zero hits ',()=>{
    const ship = Ship(3);
    expect(ship.hits).toBe(0)
})
test('calling hit() on ship increases number of hits ',()=>{
    const ship = Ship(3);

    ship.hit()
    expect(ship.hits).toBe(1)
    ship.hit()
    expect(ship.hits).toBe(2)
    ship.hit()
    expect(ship.hits).toBe(3)
})
test('ship is sunk when hits equal its length',()=>{
    const ship =Ship(3)

    ship.hit()
    expect(ship.isSunk()).toBe(false)
    ship.hit()
    expect(ship.isSunk()).toBe(false)
    ship.hit()
    expect(ship.isSunk()).toBe(true)
})
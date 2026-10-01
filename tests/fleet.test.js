import { createFleet } from "../src/fleet"

test(`createFleet creates five ships`, () => {
    const fleet = createFleet()

    expect(fleet).toHaveLength(5)
})

test(`createFleet creates ships with the correct lengths`, () => {
    const fleet = createFleet()

    expect(fleet.map(ship => ship.length))
        .toEqual([5, 4, 3, 3, 2])
})
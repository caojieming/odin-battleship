import { Ship } from "../models/Ship.js"


test('hit(coord), hits = 0 -> 1', () => {
    const cells = [[0,0], [0,1]];
    const ship = new Ship(cells);
    expect(ship.hitCells.length).toBe(0);
    ship.hit([0,0]);
    expect(ship.hitCells.length).toBe(1);
});

test('hit(coord), hits = 0 -> 1 -> 1 (hit same coord, should do nothing on second hit)', () => {
    const cells = [[0,0], [0,1]];
    const ship = new Ship(cells);
    expect(ship.hitCells.length).toBe(0);
    ship.hit([0,0]);
    expect(ship.hitCells.length).toBe(1);
    ship.hit([0,0]);
    expect(ship.hitCells.length).toBe(1);
});

test('hit(coord), hits = 0 -> 1 -> 2', () => {
    const cells = [[0,0], [0,1]];
    const ship = new Ship(cells);
    expect(ship.hitCells.length).toBe(0);
    ship.hit([0,0]);
    expect(ship.hitCells.length).toBe(1);
    ship.hit([0,1]);
    expect(ship.hitCells.length).toBe(2);
});

test('ship length 2, hits 1. isSunk() = false', () => {
    const cells = [[0,0], [0,1]];
    const ship = new Ship(cells);
    ship.hit([0,0]);
    expect(ship.isSunk()).toBe(false);
});

test('ship length 2, hits 2 (on the same cell). isSunk() = false', () => {
    const cells = [[0,0], [0,1]];
    const ship = new Ship(cells);
    ship.hit([0,0]);
    ship.hit([0,0]);
    expect(ship.isSunk()).toBe(false);
});

test('ship length 2, hits 2. isSunk() = true', () => {
    const cells = [[0,0], [0,1]];
    const ship = new Ship(cells);
    ship.hit([0,0]);
    ship.hit([0,1]);
    expect(ship.isSunk()).toBe(true);
});

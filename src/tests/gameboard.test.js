import { Ship } from "../models/Ship.js";
import { Gameboard } from "../models/Gameboard.js";


test('board creation, adding Ship([[0,0], [0,1]]) and Ship([[3,3], [3,4]])', () => {
    const ship1 = new Ship([[0,0], [0,1]]);
    const ship2 = new Ship([[3,3], [3,4]]);
    const board = new Gameboard([ship1, ship2]);

    // purely for reassuring myself that its working
    // console.log(board.strBoard());

    expect(board.board[0][0]).toBe('Z');
    expect(board.board[0][1]).toBe('Z');
    expect(board.board[0][2]).toBe(' ');
    expect(board.board[1][0]).toBe(' ');

    expect(board.board[3][3]).toBe('Z');
    expect(board.board[3][4]).toBe('Z');
    expect(board.board[3][5]).toBe(' ');
    expect(board.board[4][3]).toBe(' ');
});


test('receiveAttack(), testing miss', () => {
    const ship1 = new Ship([[0,0], [0,1]]);
    const ship2 = new Ship([[3,3], [3,4]]);
    const board = new Gameboard([ship1, ship2]);

    // purely for reassuring myself that its working
    // console.log(board.strBoard());

    expect(board.board[1][1]).toBe(' ');
    board.receiveAttack([1,1]);
    expect(board.board[1][1]).toBe('x');
});

test('receiveAttack(), testing hit', () => {
    const ship1 = new Ship([[0,0], [0,1]]);
    const ship2 = new Ship([[3,3], [3,4]]);
    const board = new Gameboard([ship1, ship2]);

    // purely for reassuring myself that its working
    // console.log(board.strBoard());

    expect(board.board[0][0]).toBe('Z');
    board.receiveAttack([0,0]);
    expect(board.board[0][0]).toBe('X');
});

test('receiveAttack(), testing hitting same spots', () => {
    const ship1 = new Ship([[0,0], [0,1]]);
    const ship2 = new Ship([[3,3], [3,4]]);
    const board = new Gameboard([ship1, ship2]);

    // purely for reassuring myself that its working
    // console.log(board.strBoard());

    expect(board.board[0][0]).toBe('Z');
    board.receiveAttack([0,0]);
    expect(board.board[0][0]).toBe('X');
    board.receiveAttack([0,0]);
    expect(board.board[0][0]).toBe('X');

    // console.log(board.strBoard());

    expect(board.board[1][1]).toBe(' ');
    board.receiveAttack([1,1]);
    expect(board.board[1][1]).toBe('x');
    board.receiveAttack([1,1]);
    expect(board.board[1][1]).toBe('x');

    // console.log(board.strBoard());
});


test('allSunk() -> false: 1 ship partially sunk, 1 ship fine', () => {
    const ship1 = new Ship([[0,0], [0,1]]);
    const ship2 = new Ship([[3,3], [3,4]]);
    const board = new Gameboard([ship1, ship2]);

    board.receiveAttack([0,0]);
    expect(board.allSunk()).toBe(false);
    // console.log(board.strBoard());
});

test('allSunk() -> false: 1 sunk, 1 ship fine', () => {
    const ship1 = new Ship([[0,0], [0,1]]);
    const ship2 = new Ship([[3,3], [3,4]]);
    const board = new Gameboard([ship1, ship2]);

    board.receiveAttack([0,0]);
    board.receiveAttack([0,1]);
    expect(board.allSunk()).toBe(false);
    // console.log(board.strBoard());
});

test('allSunk() -> true: both ships sunk', () => {
    const ship1 = new Ship([[0,0], [0,1]]);
    const ship2 = new Ship([[3,3], [3,4]]);
    const board = new Gameboard([ship1, ship2]);

    board.receiveAttack([0,0]);
    board.receiveAttack([0,1]);
    board.receiveAttack([3,3]);
    board.receiveAttack([3,4]);
    expect(board.allSunk()).toBe(true);
    // console.log(board.strBoard());
});

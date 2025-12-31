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

import { Ship } from './Ship.js'

export class Gameboard {

    // ships: array of Ship objects
    constructor(ships) {
        // create 10x10 board of spaces
        this.board = Array.from({ length: 10 }, () => Array(10).fill(" "));
        this.ships = ships;

        // populate board with ships, loop through ships and add them to the board
        for(let i = 0; i < ships.length; i++) {
            const ship = ships[i];
            
            // loop through all shipCells, adding them to the board
            for(let j = 0; j < ship.shipCells.length; j++) {
                const coord = ship.shipCells[j];
                const r = coord[0];
                const c = coord[1];
                this.board[r][c] = ship.shipCode;
            }
        }
    }

    // more for personal testing/debugging than function
    strBoard() {
        let out = '';
        for(let r = 0; r < this.board.length; r++) {
            let row = '';
            for(let c = 0; c < this.board[0].length; c++) {
                row += `[${this.board[r][c]}] `;
            }
            out += row + '\n';
        }
        return out;
    }

}

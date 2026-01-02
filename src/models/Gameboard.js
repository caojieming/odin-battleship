import { Ship } from './Ship.js'

export class Gameboard {

    // ships: array of Ship objects
    constructor(ships = this.randomShipList()) {
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


    // will create the 5 classic Battleship ships with random, valid coordinates
    randomShipList() {
        const out = [];

        // creating Carrier (5)
        let validLocation = false;
        while(!validLocation) {
            const r = Math.floor(Math.random() * 6);
            const c = Math.floor(Math.random() * 6);
            const v = Math.floor(Math.random());

            const shipCells = [];

            // v is for determining vertical or horizontal placement
            if(v === 1) {
                // vertical
                // TODO: work on random placement of ships
            }
            else {
                // horizontal

            }

            // first ship placement should have no conflicts
            out.push(new Ship(shipCells, 'C'));
            validLocation = true;
        }
        
        // creating Battleship (4)
        validLocation = false;
        while(!validLocation) {

        }

        // creating Cruiser (3)
        validLocation = false;
        while(!validLocation) {

        }

        // creating Submarine (3)
        validLocation = false;
        while(!validLocation) {

        }

        // creating Destroyer (2)
        validLocation = false;
        while(!validLocation) {

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


    // upper 'X' for hit, lower 'x' for miss
    receiveAttack(coord) {
        const r = coord[0];
        const c = coord[1];

        // do nothing if the board already has 'x' or 'x' in that coord
        if(this.board[r][c] === 'x' || this.board[r][c] === 'X') {
            return;
        }
        // mark a miss
        else if(this.board[r][c] === ' ') {
            this.board[r][c] = 'x';
        }
        // mark a hit
        else {
            const hitShip = this.getShipFromCoord(coord);
            hitShip.hit(coord);
            this.board[r][c] = 'X';
        }
    }
    getShipFromCoord(coord) {
        for(let i = 0; i < this.ships.length; i++) {
            const curShip = this.ships[i];
            if(curShip.hasUnhitCell(coord)) {
                return curShip;
            }
        }
        // theoretically with this function's use case, this return shouldn't be reached
        return false;
    }


    allSunk() {
        for(let i = 0; i < this.ships.length; i++) {
            // if current ship is not sunk
            if(!this.ships[i].isSunk()) {
                return false;
            }
        }
        return true;
    }

}

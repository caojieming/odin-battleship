import { Ship } from './Ship.js'

export class Gameboard {

    // ships: array of Ship objects
    constructor(ships = []) {
        // create 10x10 board of spaces
        this.board = Array.from({ length: 10 }, () => Array(10).fill(" "));
        this.ships = ships;

        if(ships.length === 0) {
            // this both randomly generates the ship list (this.ships) and populates the board (this.board)
            this.randomShipPlacement();
        }
        else {
            // populate board with ships, loop through ships and add them to the board
            for(let i = 0; i < ships.length; i++) {
                this.placeShipOnBoard(ships[i]);
            }
        }
    }


    // given a ship object, place the ship on this.board
    placeShipOnBoard(ship) {
        // loop through all shipCells, adding them to the board
        for(let i = 0; i < ship.shipCells.length; i++) {
            const coord = ship.shipCells[i];
            const r = coord[0];
            const c = coord[1];
            this.board[r][c] = ship.shipCode;
        }
    }


    // will create the 5 classic Battleship ships with random, valid coordinates, and attach them to this.ships and this.board
    randomShipPlacement() {
        // creating Carrier (5)
        this.generateAndPlaceShip(5, 'C');

        // creating Battleship (4)
        this.generateAndPlaceShip(4, 'B');

        // creating Cruiser (3)
        this.generateAndPlaceShip(3, 'C');

        // creating Submarine (3)
        this.generateAndPlaceShip(3, 'S');

        // creating Destroyer (2)
        this.generateAndPlaceShip(2, 'D');
    }
    generateAndPlaceShip(size, symbol) {
        // keep looping until a valid ship is generated and placed
        let validLocation = false;
        while(!validLocation) {
            const r = Math.floor(Math.random() * (10 - size + 1));
            const c = Math.floor(Math.random() * (10 - size + 1));
            const v = Math.floor(Math.random() * 2);
            const shipCells = [];
            // used for retrying ship generation if current generation overlaps with an existing ship
            let retry = false;

            // generate the ship, making sure it doesn't overlap with existing ships
            for(let i = 0; i < size; i++) {
                // vertical placement
                if(v === 1) {
                    // check if space is available
                    if(this.board[r + i][c] === ' ') {
                        shipCells.push([r + i, c]);
                    }
                    // otherwise stop current generation of ship and try again
                    else {
                        // break out of for loop, and hit the retry conditional to continue while loop
                        retry = true;
                        break;
                    }
                }
                // horizontal placement
                else {
                    if(this.board[r][c + i] === ' ') {
                        shipCells.push([r, c + i]);
                    }
                    else {
                        retry = true;
                        break;
                    }
                }
            }

            // overlapped with existing ship, so continue and retry
            if(retry) { continue; }

            // formally place the ship on the board (and add ship to this.ships)
            const newShip = new Ship(shipCells, symbol);
            this.ships.push(newShip);
            this.placeShipOnBoard(newShip);

            // successfully placed ship on board, so exit loop
            validLocation = true;
        }
    }


    // more for personal testing/debugging than function
    strBoard() {
        let out = '   0   1   2   3   4   5   6   7   8   9\n';
        for(let r = 0; r < this.board.length; r++) {
            let row = `${r} `;
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

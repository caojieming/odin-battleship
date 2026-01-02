export class Ship {

    /*
    shipCells: array of arrays [row, col] of the ship
    hitCells: array of arrays [row, col] of the ship that are hit
    shipCode: an uppercase char representing it on the Gameboard
    */
    constructor(shipCells, shipCode = 'Z', hitCells = []) {
        this.shipCells = shipCells;
        this.shipCode = shipCode;
        this.hitCells = hitCells;
        this.length = shipCells.length;
    }


    // returns true if successfully hit an unhit shipCell, false otherwise
    // in the case of true, also adds the coord to hitCells
    hit(coord) {
        if(this.hasUnhitCell(coord)) {
            this.hitCells.push(coord);
            return true;
        }
        else {
            return false;
        }
    }

    // returns true if coord [r,c] can be found in shipCells [[r1,c1], [r2, c2], ...], but not hitCells
    hasUnhitCell(targ) {
        let inHitCells = false;
        let inShipCells = false;

        // check if targ is in hitCells. if it is, set inHitCells to true and break
        for(let i = 0; i < this.hitCells.length; i++) {
            if(this.hitCells[i][0] === targ[0] && this.hitCells[i][1] === targ[1]) {
                inHitCells = true;
                break;
            }
        }

        // targ is in hitCells, so return false early
        if(inHitCells) {
            return false;
        }

        // check if targ is in shipCells. if it is, set inShipCells to true and break
        for(let i = 0; i < this.shipCells.length; i++) {
            if(this.shipCells[i][0] === targ[0] && this.shipCells[i][1] === targ[1]) {
                inShipCells = true;
                break;
            }
        }

        // return true if coord is in shipCells, but not in hitCells
        return inShipCells && !inHitCells;
    }


    isSunk() {
        return this.hitCells.length >= this.shipCells.length;
    }

}

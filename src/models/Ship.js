export class Ship {

    /*
    shipCells: array of arrays [row, col] of the ship
    hitCells: array of arrays [row, col] of the ship that are hit
    */
    constructor(shipCells, hitCells = []) {
        this.shipCells = shipCells;
        this.hitCells = hitCells;
        this.length = shipCells.length;
    }

    // returns true if successfully hit an unhit shipCell, false otherwise
    hit(coord) {
        // console.log(`input: ${coord}`);
        // console.log(this.shipCells);
        // console.log(this.hitCells);
        if(arrHasArr(this.shipCells, coord) && !arrHasArr(this.hitCells, coord)) {
            this.hitCells.push(coord);
            return true;
        }
        else {
            return false;
        }
    }

    isSunk() {
        return this.hitCells.length >= this.shipCells.length;
    }

}

// returns true if array [r,c] can be found in array of arrays [[r1,c1], [r2, c2], ...]
function arrHasArr(arr, targ) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i][0] === targ[0] && arr[i][1] === targ[1]) {
            return true;
        }
    }
    return false;
}

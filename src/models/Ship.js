class Ship {

    constructor(length = 3, hits = 0, sunk = false) {
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        const sunk = this.hits >= this.length;

        // sets Ship.sunk to true
        if(sunk && !this.sunk) {
            this.sunk = sunk;
        }

        return sunk;
    }

}

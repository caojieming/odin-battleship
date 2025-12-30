import { Ship } from './Ship.js'

class Gameboard {

    constructor() {
        // create 10x10 board of spaces
        this.board = Array.from({ length: 10 }, () => Array(10).fill(" "));;
    }

}

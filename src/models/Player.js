import { Gameboard } from "./Gameboard.js";

export class Player {
    
    // type: "human" controlled or "computer" controlled
    // customShips: optional list of custom length/letter-coded/quantity of ships to place on gameboard
    constructor(type = "computer", customShips = false) {
        this.type = type;

        if(customShips) {
            this.gameBoard = new Gameboard(customShips);
        }
        else {
            this.gameBoard = new Gameboard();
        }
        
    }

    
    

}
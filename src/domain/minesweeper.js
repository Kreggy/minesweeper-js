import {field} from "./models/field.js";

export class Minesweeper {

    /**
     * @param {number} rows
     * @param {number} columns
     * @param {number | null} bombs
     */
    constructor(rows, columns, bombs = null) {
        this.rows = rows;
        this.columns = columns;

        this.isGameOver = false;

        if (bombs == null)
            this.bombs = this._calculateDefaultBombs();
        else
            this.bombs = bombs;

        this.pole = [];
    }

    /**
     * TODO: IMPLEMENT THIS
     * Calculate how many bombs should be on the field and return it.
     * The calculation should Depend on the size of the field.
     * @private 
     * @return {} amount of bombs
     */
    _calculateDefaultBombs() {
        let CalcBombs = 8;
        if (this.rows > 10) {
            for (let i = 0; i < this.rows; i++)
                defBombs++;
        }
        return CalcBombs;
    }

    /**
     * TODO: IMPLEMENT THIS
     * Returns the current state of the field.
     * Fields can be: hidden, visible, flagged or question marked.
     * @param {number} x
     * @param {number} y
     * @return {field}
     */
    getField(x, y) {
        return this.array[x][y];
    }

    /**
     * TODO: IMPLEMENT THIS
     * Returns how many bombs are around the field
     * @param {number} x
     * @param {number} y
     * @return {number}
     */
    getAmountOfSurroundingBombs(x, y) {
        let SurroundingBombs = 0;
        
        if(this.isBombOnPosition(x+1, y)===true)
            SurroundingBombs++;
        if(this.isBombOnPosition(x-1, y)===true)
            SurroundingBombs++;
        if(this.isBombOnPosition(x+1, y+1)===true)
            SurroundingBombs++;
        if(this.isBombOnPosition(x-1, y+1)===true)
            SurroundingBombs++;
        if(this.isBombOnPosition(x+1, y-1)===true)
            SurroundingBombs++;
        if(this.isBombOnPosition(x+1, y-1)===true)
            SurroundingBombs++;
        if(this.isBombOnPosition(x, y+1)===true)
            SurroundingBombs++;
        if(this.isBombOnPosition(x, y-1)===true)
            SurroundingBombs++;
            
        return SurroundingBombs;
    }

    /**
     * TODO: IMPLEMENT THIS
     * Returns true there is a bomb on the position
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    isBombOnPosition(x, y) {
        return true;
    }

    /**
     * TODO: IMPLEMENT THIS
     * Reveals the field and all empty connected fields around it.
     * Or stops the game if clicked on a position, where a bomb is located.
     * @param {number} x
     * @param {number} y
     */
    reveal(x, y) {

    }

    /**
     * TODO: IMPLEMENT THIS
     * Toggles the field state, if it has not been revealed yet.
     * @param {number} x
     * @param {number} y
     */
    toggleFieldState(x, y) {
    }

    /**
     * TODO: IMPLEMENT THIS
     * Returns if the user already won
     * @returns {boolean}
     */
    didWin() {
        return false;
    }

    /**
     * TODO: IMPLEMENT THIS
     * Returns if the user clicked a bomb and therefore lost.
     * @returns {boolean}
     */
    didLoose() {
        return false;
    }

    /**
     * Returns the remaining amount bombs, user has to select
     * @return {number}
     */
    getRemainingBombCount() {
        return this.bombs;
    }

}

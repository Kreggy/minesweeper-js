import {field} from "./models/field.js";
import {Coords} from "./models/Coords.js";

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

        this.array = [];
        for (let i = 0; i < rows; i++) {
            let tempArray = [];
            for (let j = 0; j < columns; j++) {
                tempArray.push(field.hidden);
            }
            this.array.push(tempArray);
        }

        this.bombLoc = [];
        for (let i = 0; i < this.bombs; i++){
            let x = Math.floor(Math.random()*columns);
            let y = Math.floor(Math.random()*rows);
            let coor = new Coords(x, y);
            this.bombLoc.push(coor);
        }
    }

    

    /**
     * TODO: IMPLEMENT THIS (DONE)
     * Calculate how many bombs should be on the field and return it.
     * The calculation should Depend on the size of the field.
     * @private 
     * @return {} amount of bombs
     */
    _calculateDefaultBombs() {
        let CalcBombs = 8;
        if (this.rows > 10) {
            for (let i = 0; i < this.rows; i++)
                CalcBombs++;
        }
        return CalcBombs;
    }

    /**
     * TODO: IMPLEMENT THIS (DONE)
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
     * TODO: IMPLEMENT THIS (DONE)
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
        if(this.isBombOnPosition(x-1, y-1)===true)
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
        for (let i = 0; i < this.bombLoc.length; i++) {
            if (this.bombLoc[i].x === x && this.bombLoc[i].y === y)
                return true;
        }
        return false;
    }

    /**
     * TODO: IMPLEMENT THIS
     * Reveals the field and all empty connected fields around it.
     * Or stops the game if clicked on a position, where a bomb is located.
     * @param {number} x
     * @param {number} y
     */
    reveal(x, y) {
        if (this.isBombOnPosition(x,y) === true) {
            this.isGameOver = true;
            this.array[x][y] = field.hidden;
        }
        this.revealField(x,y);
    }

    revealField(x,y) {
        console.log(this.getAmountOfSurroundingBombs(x,y) === 0 && this.array[x][y] === field.hidden);

        if (this.array[x][y] === field.hidden) {
            this.array[x][y] = field.visible;
            if (this.getAmountOfSurroundingBombs(x, y) === 0) {

                if (x + 1 >= 0 && x + 1 < this.rows && y >= 0 && y < this.columns) {
                    this.revealField(x + 1, y);
                }
                if (x - 1 >= 0 && x - 1 < this.rows && y >= 0 && y < this.columns) {
                    this.revealField(x - 1, y);
                }
                if (x >= 0 && x < this.rows && y + 1 >= 0 && y + 1 < this.columns) {
                    this.revealField(x, y + 1);
                }
                if (x >= 0 && x < this.rows && y - 1 >= 0 && y - 1 < this.columns) {
                    this.revealField(x, y - 1);
                }
            }
        }
    }

    /**
     * TODO: IMPLEMENT THIS
     * Toggles the field state, if it has not been revealed yet.
     * @param {number} x
     * @param {number} y
     */
    toggleFieldState(x, y) {
        if (this.array[x][y] === field.hidden)
            this.array[x][y] = field.flag;

        else if (this.array[x][y] === field.flag)
            this.array[x][y] = field.question_mark;

        else if ( this.array[x][y] === field.question_mark)
            this.array[x][y] = field.hidden;

        else this.array[y][x] = field.visible;
    }

    /**
     * TODO: IMPLEMENT THIS
     * Returns if the user already won
     * @returns {boolean}
     */
    didWin() {
        if(this.isGameOver == false)
        return false;
    }

    /**
     * TODO: IMPLEMENT THIS
     * Returns if the user clicked a bomb and therefore lost.
     * @returns {boolean}
     */
    didLoose() {
        if(this.isGameOver == true)
        return true;
    }

    /**
     * Returns the remaining amount bombs, user has to select
     * @return {number}
     */
    getRemainingBombCount() {
        return this.bombs;
    }

}

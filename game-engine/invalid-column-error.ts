export class InvalidColumnError extends Error{

    constructor(column: number)
    {

        super(`The column ${column} is not a valid column. Valid Columns are 1 - 7.`);


        this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
    }

}
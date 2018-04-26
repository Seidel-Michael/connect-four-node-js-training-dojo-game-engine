export class ColumnFullError extends Error
{
    constructor(column: number)
    {

        super(`The column ${column} is already full.`);


        this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
    }
}
import {ColumnFullError} from './column-full-error';
import {InvalidColumnError} from './invalid-column-error';

export class ConnectFourEngine {
  private currentBoard: number[][];
  private currentPlayer: number;

  constructor() {
    this.currentBoard = [
      [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ];
    this.currentPlayer = 1;
  }

  dropDisc(column: number): Promise<boolean> {
    return new Promise((resolve: (value?: boolean) => void, reject: (error?: Error) => void) => {

      if (column > 6 || column < 0) {
        reject(new InvalidColumnError(column));
        return;
      }

      for (let i = 0; i < 6; i++) {
        if (this.currentBoard[column][i] === 0) {
          this.currentBoard[column][i] = this.currentPlayer;
          this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
          resolve(this.checkBoard());
          return;
        }
      }

      reject(new ColumnFullError(column));
      return;
    });
  }

  private checkBoard(): boolean {
    return this.checkBoardHorizontal() || this.checkBoardVertical() || this.checkBoardDiagonalUpX() || this.checkBoardDiagonalUpY() ||
        this.checkBoardDiagonalDownX() || this.checkBoardDiagonalDownY();
  }

  private checkBoardDiagonalDownY(): boolean {
    let lastPlayer = 0;
    let continuousCount = 0;

    for (let y = 5; y > 2; y--) {
      lastPlayer = 0;
      continuousCount = 0;

      let yMod = y;
      let x = 0;
      while (x < 7 && yMod >= 0) {
        if (this.currentBoard[x][yMod] === 0) {
          lastPlayer = 0;
          continuousCount = 0;
          yMod--;
          x++;
          continue;
        }
        if (this.currentBoard[x][yMod] === lastPlayer) {
          continuousCount++;
        } else {
          continuousCount = 0;
        }

        if (continuousCount === 3) {
          return true;
        }
        lastPlayer = this.currentBoard[x][yMod];
        yMod--;
        x++;
      }
    }

    return false;
  }

  private checkBoardDiagonalDownX(): boolean {
    let lastPlayer = 0;
    let continuousCount = 0;

    for (let x = 0; x < 4; x++) {
      lastPlayer = 0;
      continuousCount = 0;

      let xMod = x;
      let y = 5;
      while (xMod < 7 && y >= 0) {
        if (this.currentBoard[xMod][y] === 0) {
          lastPlayer = 0;
          continuousCount = 0;
          xMod++;
          y--;
          continue;
        }
        if (this.currentBoard[xMod][y] === lastPlayer) {
          continuousCount++;
        } else {
          continuousCount = 0;
        }

        if (continuousCount === 3) {
          return true;
        }
        lastPlayer = this.currentBoard[xMod][y];
        xMod++;
        y--;
      }
    }

    return false;
  }

  private checkBoardDiagonalUpY(): boolean {
    let lastPlayer = 0;
    let continuousCount = 0;

    for (let y = 0; y < 3; y++) {
      lastPlayer = 0;
      continuousCount = 0;

      let yMod = y;
      let x = 0;
      while (x < 7 && yMod < 6) {
        if (this.currentBoard[x][yMod] === 0) {
          lastPlayer = 0;
          continuousCount = 0;
          yMod++;
          x++;
          continue;
        }
        if (this.currentBoard[x][yMod] === lastPlayer) {
          continuousCount++;
        } else {
          continuousCount = 0;
        }

        if (continuousCount === 3) {
          return true;
        }
        lastPlayer = this.currentBoard[x][yMod];
        yMod++;
        x++;
      }
    }

    return false;
  }

  private checkBoardDiagonalUpX(): boolean {
    let lastPlayer = 0;
    let continuousCount = 0;

    for (let x = 0; x < 4; x++) {
      lastPlayer = 0;
      continuousCount = 0;

      let xMod = x;
      let y = 0;
      while (xMod < 7 && y < 6) {
        if (this.currentBoard[xMod][y] === 0) {
          lastPlayer = 0;
          continuousCount = 0;
          xMod++;
          y++;
          continue;
        }
        if (this.currentBoard[xMod][y] === lastPlayer) {
          continuousCount++;
        } else {
          continuousCount = 0;
        }

        if (continuousCount === 3) {
          return true;
        }
        lastPlayer = this.currentBoard[xMod][y];
        xMod++;
        y++;
      }
    }

    return false;
  }

  private checkBoardHorizontal(): boolean {
    let lastPlayer = 0;
    let continuousCount = 0;
    for (let y = 0; y < 6; y++) {
      lastPlayer = 0;
      continuousCount = 0;
      for (let x = 0; x < 7; x++) {
        if (this.currentBoard[x][y] === 0) {
          lastPlayer = 0;
          continuousCount = 0;
          continue;
        }
        if (this.currentBoard[x][y] === lastPlayer) {
          continuousCount++;
        } else {
          continuousCount = 0;
        }

        if (continuousCount === 3) {
          return true;
        }
        lastPlayer = this.currentBoard[x][y];
      }
    }

    return false;
  }

  private checkBoardVertical(): boolean {
    let lastPlayer = 0;
    let continuousCount = 0;
    for (let x = 0; x < 7; x++) {
      lastPlayer = 0;
      continuousCount = 0;
      for (let y = 0; y < 6; y++) {
        if (this.currentBoard[x][y] === 0) {
          lastPlayer = 0;
          continuousCount = 0;
          continue;
        }
        if (this.currentBoard[x][y] === lastPlayer) {
          continuousCount++;
        } else {
          continuousCount = 0;
        }

        if (continuousCount === 3) {
          return true;
        }
        lastPlayer = this.currentBoard[x][y];
      }
    }

    return false;
  }
}
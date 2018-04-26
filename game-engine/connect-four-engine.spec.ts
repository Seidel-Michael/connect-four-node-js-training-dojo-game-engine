import * as chai from 'chai';
import {expect} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import {ColumnFullError} from './column-full-error';
import {ConnectFourEngine} from './connect-four-engine';
import {InvalidColumnError} from './invalid-column-error';

chai.use(chaiAsPromised);

const prepareGame = async(movesToPreparePlayer1: number[], movesToPreparePlayer2: number[], engine: ConnectFourEngine): Promise<void> => {
  return new Promise(async (resolve: (value?: void) => void, reject: (error?: Error) => void) => {

    for (let i = 0; i < movesToPreparePlayer1.length; i++) {
      const result1 = await engine.dropDisc(movesToPreparePlayer1[i]);
      const result2 = await engine.dropDisc(movesToPreparePlayer2[i]);

      if (result1 || result2) {
        reject();
      }
    }

    resolve();

  });
};

describe('ConnectFourGameEngine', () => {

  describe('dropChip', () => {

    describe('reject', () => {

      it('should reject with InvalidColumnError if the given column is greater than 6', () => {
        const engine = new ConnectFourEngine();

        return expect(engine.dropDisc(7)).to.be.rejectedWith(InvalidColumnError);
      });

      it('should reject with InvalidColumnError if the given column is smaller than 0', () => {
        const engine = new ConnectFourEngine();

        return expect(engine.dropDisc(-1)).to.be.rejectedWith(InvalidColumnError);
      });

      it('should reject with ColumnFullError if there are 6 discs dropped before', async () => {
        const engine = new ConnectFourEngine();

        await engine.dropDisc(2);
        await engine.dropDisc(2);
        await engine.dropDisc(2);
        await engine.dropDisc(2);
        await engine.dropDisc(2);
        await engine.dropDisc(2);

        return expect(engine.dropDisc(2)).to.be.rejectedWith(ColumnFullError);
      });

    });

    describe('resolve', () => {

      it('should resolve with false if chip is dropped correctly on first drop', () => {
        const engine = new ConnectFourEngine();

        return expect(engine.dropDisc(3)).to.eventually.be.false;
      });

      it('should resolve with false if chip is dropped correctly on forth drop', async () => {
        const engine = new ConnectFourEngine();

        await engine.dropDisc(3);
        await engine.dropDisc(3);
        await engine.dropDisc(3);

        return expect(engine.dropDisc(3)).to.eventually.be.false;
      });

      describe('player 1', () => {
        describe('win horizontal', () => {

          it('should resolve with true starting field 0-0', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [2, 3, 4, 0];
            const movesToPreparePlayer2 = [5, 6, 5, 6];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(1)).to.eventually.be.true;
          });

          it('should resolve with true starting field 3-0', async () => {
            const engine = new ConnectFourEngine();
            const movesToPrepare = [3, 0, 4, 0, 5, 1];
            const movesToPreparePlayer1 = [3, 4, 5];
            const movesToPreparePlayer2 = [0, 0, 1];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(6)).to.eventually.be.true;
          });

          it('should resolve with true starting field 0-5', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [0, 0, 0, 2, 2, 2, 1, 3, 0, 1, 2];
            const movesToPreparePlayer2 = [1, 1, 1, 3, 3, 3, 0, 2, 4, 4, 6];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(3)).to.eventually.be.true;
          });

          it('should resolve with true starting field 3-5', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [3, 3, 3, 5, 5, 5, 4, 6, 3, 4, 5];
            const movesToPreparePlayer2 = [4, 4, 4, 6, 6, 6, 3, 5, 0, 0, 1];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(6)).to.eventually.be.true;
          });

          it('should resolve with true starting field 2-2', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [0, 2, 4, 1, 2, 3];
            const movesToPreparePlayer2 = [1, 3, 0, 0, 1, 2];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(4)).to.eventually.be.true;
          });

        });

        describe('win vertical', () => {

          it('should resolve with true starting field 0-0', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [0, 0, 0];
            const movesToPreparePlayer2 = [1, 1, 1];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(0)).to.eventually.be.true;
          });

          it('should resolve with true starting field 6-0', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [6, 6, 6];
            const movesToPreparePlayer2 = [1, 1, 1];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(6)).to.eventually.be.true;

          });

          it('should resolve with true starting field 0-2', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [1, 1, 0, 0, 0];
            const movesToPreparePlayer2 = [0, 0, 1, 1, 1];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(0)).to.eventually.be.true;
          });

          it('should resolve with true starting field 6-2', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [1, 1, 6, 6, 6];
            const movesToPreparePlayer2 = [6, 6, 0, 1, 1];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(6)).to.eventually.be.true;

          });

          it('should resolve with true starting field 2-1', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [1, 1, 2, 2, 2];
            const movesToPreparePlayer2 = [2, 0, 0, 1, 1];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(2)).to.eventually.be.true;

          });

        });

        describe('win diagonal up', () => {

          it('should resolve with true starting field 0-0', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [0, 1, 2, 2, 4];
            const movesToPreparePlayer2 = [1, 3, 2, 3, 3];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(3)).to.eventually.be.true;
          });

          it('should resolve with true starting field 0-2', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [0, 0, 1, 1, 2, 3, 2, 3, 3];
            const movesToPreparePlayer2 = [0, 1, 1, 2, 2, 2, 3, 3, 4];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(3)).to.eventually.be.true;
          });

          it('should resolve with true starting field 3-0', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [3, 4, 5, 5, 0];
            const movesToPreparePlayer2 = [4, 6, 5, 6, 6];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(6)).to.eventually.be.true;
          });

          it('should resolve with true starting field 3-2', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [3, 3, 4, 4, 5, 6, 5, 6, 6];
            const movesToPreparePlayer2 = [3, 4, 4, 5, 5, 5, 6, 6, 0];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(6)).to.eventually.be.true;
          });
        });

        describe('win diagonal down', () => {

          it('should resolve with true starting field 6-0', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [6, 5, 4, 4, 3];
            const movesToPreparePlayer2 = [5, 4, 3, 3, 0];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(3)).to.eventually.be.true;
          });

          it('should resolve with true starting field 6-2', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [6, 4, 5, 3, 6, 5, 4, 4, 3];
            const movesToPreparePlayer2 = [6, 5, 4, 3, 5, 4, 3, 3, 0];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(3)).to.eventually.be.true;
          });

          it('should resolve with true starting field 3-0', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [3, 2, 1, 1, 0];
            const movesToPreparePlayer2 = [2, 1, 0, 0, 6];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(0)).to.eventually.be.true;
          });

          it('should resolve with true starting field 3-2', async () => {
            const engine = new ConnectFourEngine();
            const movesToPreparePlayer1 = [3, 1, 2, 0, 3, 2, 1, 1, 0];
            const movesToPreparePlayer2 = [3, 2, 1, 0, 2, 1, 0, 0, 6];

            await prepareGame(movesToPreparePlayer1, movesToPreparePlayer2, engine);

            return expect(engine.dropDisc(0)).to.eventually.be.true;
          });
        });
      });
    });
  });
});

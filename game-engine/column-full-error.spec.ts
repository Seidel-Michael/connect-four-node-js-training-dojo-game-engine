import {expect} from 'chai';
import {ColumnFullError} from './column-full-error';

describe('ColumnFullError constructor', () => {
  it('should set correct message', () => {
    const error = new ColumnFullError(5);
    expect(error.message).to.eql('The column 5 is already full.');
  });

  it('should set stacktrace', () => {
    const error = new ColumnFullError(5);
    expect(error.stack).to.contain('at ');
  });

  it('should set correct name', () => {
    const error = new ColumnFullError(5);
    expect(error.name).to.eql('ColumnFullError');
  });
});

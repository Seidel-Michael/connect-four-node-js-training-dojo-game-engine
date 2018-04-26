import {expect} from 'chai';
import {InvalidColumnError} from './invalid-column-error';

describe('InvalidColumnError constructor', () => {
  it('should set correct message', () => {
    const error = new InvalidColumnError(-1);
    expect(error.message).to.eql('The column -1 is not a valid column. Valid Columns are 1 - 7.');
  });

  it('should set stacktrace', () => {
    const error = new InvalidColumnError(-1);
    expect(error.stack).to.contain('at ');
  });

  it('should set correct name', () => {
    const error = new InvalidColumnError(-1);
    expect(error.name).to.eql('InvalidColumnError');
  });
});

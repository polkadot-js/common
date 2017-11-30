// ISC, Copyright 2017 Jaco Greeff

const { keccakAsHex } = require('./index');

const value = 'test value';
const result = '2d07364b5c231c56ce63d49430e085ea3033c750688ba532b24029124c26ca5e';

describe('keccakAsHex', () => {
  it('returns a prefixed hex representation', () => {
    expect(
      keccakAsHex(value)
    ).toEqual(`0x${result}`);
  });
});

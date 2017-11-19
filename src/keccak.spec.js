// ISC, Copyright 2017 Jaco Greeff

/* eslint-disable no-unused-expressions */

const { keccak, keccakAsBuffer, keccakAsHex } = require('./keccak');

describe('keccak', () => {
  const value = 'test value';
  const result = '2d07364b5c231c56ce63d49430e085ea3033c750688ba532b24029124c26ca5e';

  describe('keccak', () => {
    it('returns an un-prefixed hex representation', () => {
      expect(
        keccak(value)
      ).to.equal(result);
    });
  });

  describe('keccakAsBuffer', () => {
    it('returns an hex representation', () => {
      expect(
        keccakAsBuffer(value).equals(
          Buffer.from(result, 'hex')
        )
      ).to.be.true;
    });
  });

  describe('keccakAsHex', () => {
    it('returns an hex representation', () => {
      expect(
        keccakAsHex(value)
      ).to.equal(`0x${result}`);
    });
  });
});

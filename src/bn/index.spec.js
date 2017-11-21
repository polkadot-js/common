// ISC, Copyright 2017 Jaco Greeff

const BN = require('bn.js');

const { bnFromHex, bnToHex } = require('./index');

describe('bn', () => {
  describe('bnFromHex', () => {
    const value = '80';

    it('converts prefixed hex values to BN', () => {
      expect(
        bnFromHex(`0x${value}`).eq(
          new BN(value, 16)
        )
      ).toEqual(true);
    });

    it('converts null values to BN(0)', () => {
      expect(
        bnFromHex(null).eq(
          new BN(0)
        )
      ).toEqual(true);
    });

    it('throws when trying to convert non-BN values', () => {
      expect(
        () => bnFromHex('noAHex')
      ).toThrow(/Cannot convert from non-hex/);
    });
  });

  describe('bnToHex', () => {
    it('converts BN values to a prefixed hex representation', () => {
      expect(
        bnToHex(new BN(128))
      ).toEqual('0x80');
    });

    it('converts null values to 0x', () => {
      expect(
        bnToHex(null)
      ).toEqual('0x');
    });

    it('throws when trying to convert non-BN values', () => {
      expect(
        () => bnToHex('notABn')
      ).toThrow(/Cannot convert from non-BN/);
    });
  });
});

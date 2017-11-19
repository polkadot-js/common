// ISC, Copyright 2017 Jaco Greeff

/* eslint-disable no-unused-expressions */

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
      ).to.be.true;
    });

    it('converts null values to BN(0)', () => {
      expect(
        bnFromHex(null).eq(
          new BN(0)
        )
      ).to.be.true;
    });

    it('throws when trying to convert non-BN values', () => {
      expect(
        () => bnFromHex('noAHex')
      ).to.throw(/Cannot convert from non-hex/);
    });
  });

  describe('bnToHex', () => {
    it('converts BN values to a prefixed hex representation', () => {
      expect(
        bnToHex(new BN(128))
      ).to.equal('0x80');
    });

    it('converts null values to 0x', () => {
      expect(
        bnToHex(null)
      ).to.equal('0x');
    });

    it('throws when trying to convert non-BN values', () => {
      expect(
        () => bnToHex('notABn')
      ).to.throw(/Cannot convert from non-BN/);
    });
  });
});

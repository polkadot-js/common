// ISC, Copyright 2017 Jaco Greeff

/* eslint-disable no-unused-expressions */

const BN = require('bn.js');

const { isBN, isFunction, isHex, isInstanceOf, isNumber, isString, isUndefined } = require('./index');

describe('is', () => {
  describe('isBN', () => {
    it('returns true when a BN value', () => {
      expect(
        isBN(new BN(123))
      ).to.be.true;
    });

    it('returns false on non-BN values', () => {
      expect(
        isBN(0)
      ).to.be.false;
    });
  });

  describe('isFunction', () => {
    it('returns true on valid functions', () => {
      expect(
        isFunction(isFunction)
      ).to.be.true;
    });

    it('returns false on invalid functions', () => {
      expect(
        isFunction('notAFunction')
      ).to.be.false;
    });
  });

  describe('isHex', () => {
    const test = '123abcd45';

    it('returns true on hex values', () => {
      expect(
        isHex(`0x${test}`)
      ).to.be.true;
    });

    it('returns true on uppercase values', () => {
      expect(
        isHex(`0x${test.toUpperCase()}`)
      ).to.be.true;
    });

    it('return false on hex values unprefixed', () => {
      expect(
        isHex(test)
      ).to.be.false;
    });

    it('returns false on non-string values', () => {
      expect(
        isHex(false)
      ).to.be.false;
    });
  });

  describe('isInstanceOf', () => {
    it('returns true on real instances', () => {
      expect(
        isInstanceOf(new Array(2), Array)
      ).to.be.true;
    });

    it('returns false on non-allocated instances', () => {
      expect(
        isInstanceOf([], Array)
      ).to.be.true;
    });

    it('returns false on non-instances', () => {
      expect(
        isInstanceOf('array', Array)
      ).to.be.false;
    });

    it('returns false when class not specified', () => {
      expect(
        isInstanceOf('array', Array)
      ).to.be.false;
    });

    it('returns false on wrong class type', () => {
      expect(
        isInstanceOf(new Array(2), String)
      ).to.be.false;
    });
  });

  describe('isNumber', () => {
    it('returns true on valid numbers', () => {
      expect(
        isNumber(2)
      ).to.be.true;
    });

    it('returns false on invalid numbers', () => {
      expect(
        isNumber('2')
      ).to.be.false;
    });
  });

  describe('isString', () => {
    it('returns true on valid strings', () => {
      expect(
        isString('123')
      ).to.be.true;
    });

    it('returns true on empty strings', () => {
      expect(
        isString('')
      ).to.be.true;
    });

    it('returns false on invalid numbers', () => {
      expect(
        isString(2)
      ).to.be.false;
    });
  });

  describe('isUndefined', () => {
    it('returns true on undefined values', () => {
      expect(
        isUndefined()
      ).to.be.true;
    });

    it('returns false on defined values', () => {
      expect(
        isUndefined(null)
      ).to.be.false;
    });
  });
});

// ISC, Copyright 2017 Jaco Greeff

/* eslint-disable no-unused-expressions */

const BN = require('bn.js');

const { isBN, isFunction, isHex, isInstanceOf, isNumber, isString, isUndefined } = require('./index');

describe('is', () => {
  describe('isBN', () => {
    it('returns true when a BN value', () => {
      expect(
        isBN(new BN(123))
      ).toEqual(true);
    });

    it('returns false on non-BN values', () => {
      expect(
        isBN(0)
      ).toEqual(false);
    });
  });

  describe('isFunction', () => {
    it('returns true on valid functions', () => {
      expect(
        isFunction(isFunction)
      ).toEqual(true);
    });

    it('returns false on invalid functions', () => {
      expect(
        isFunction('notAFunction')
      ).toEqual(false);
    });
  });

  describe('isHex', () => {
    const test = '123abcd45';

    it('returns true on hex values', () => {
      expect(
        isHex(`0x${test}`)
      ).toEqual(true);
    });

    it('returns true on uppercase values', () => {
      expect(
        isHex(`0x${test.toUpperCase()}`)
      ).toEqual(true);
    });

    it('return false on hex values unprefixed', () => {
      expect(
        isHex(test)
      ).toEqual(false);
    });

    it('returns false on non-string values', () => {
      expect(
        isHex(false)
      ).toEqual(false);
    });
  });

  describe('isInstanceOf', () => {
    it('returns true on real instances', () => {
      expect(
        isInstanceOf(new Array(2), Array)
      ).toEqual(true);
    });

    it('returns false on non-allocated instances', () => {
      expect(
        isInstanceOf([], Array)
      ).toEqual(true);
    });

    it('returns false on non-instances', () => {
      expect(
        isInstanceOf('array', Array)
      ).toEqual(false);
    });

    it('returns false when class not specified', () => {
      expect(
        isInstanceOf('array', Array)
      ).toEqual(false);
    });

    it('returns false on wrong class type', () => {
      expect(
        isInstanceOf(new Array(2), String)
      ).toEqual(false);
    });
  });

  describe('isNumber', () => {
    it('returns true on valid numbers', () => {
      expect(
        isNumber(2)
      ).toEqual(true);
    });

    it('returns false on invalid numbers', () => {
      expect(
        isNumber('2')
      ).toEqual(false);
    });
  });

  describe('isString', () => {
    it('returns true on valid strings', () => {
      expect(
        isString('123')
      ).toEqual(true);
    });

    it('returns true on empty strings', () => {
      expect(
        isString('')
      ).toEqual(true);
    });

    it('returns false on invalid numbers', () => {
      expect(
        isString(2)
      ).toEqual(false);
    });
  });

  describe('isUndefined', () => {
    it('returns true on undefined values', () => {
      expect(
        isUndefined()
      ).toEqual(true);
    });

    it('returns false on defined values', () => {
      expect(
        isUndefined(null)
      ).toEqual(false);
    });
  });
});

// ISC, Copyright 2017 Jaco Greeff

/* eslint-disable no-unused-expressions */

const { hexAddPrefix, hexHasPrefix, hexStripPrefix } = require('./index');

describe('hex', () => {
  describe('hexAddPrefix', () => {
    it('does not add when prefix is available', () => {
      expect(
        hexAddPrefix('0x0123')
      ).toEqual('0x0123');
    });

    it('adds the prefix when it is not available', () => {
      expect(
        hexAddPrefix('0123')
      ).toEqual('0x0123');
    });

    it('adds extra 0 when length % 2 === 1', () => {
      expect(
        hexAddPrefix('123')
      ).toEqual('0x0123');
    });

    it('returns null as 0x', () => {
      expect(
        hexAddPrefix(null)
      ).toEqual('0x');
    });
  });

  describe('hexHasPrefix', () => {
    it('returns true when hex prefix is found', () => {
      expect(
        hexHasPrefix('0x123')
      ).toEqual(true);
    });

    it('returns false when no prefix attached', () => {
      expect(
        hexHasPrefix('123')
      ).toEqual(false);
    });

    it('returns false when null value supplied', () => {
      expect(
        hexHasPrefix(null)
      ).toEqual(false);
    });

    it('returns false when non-string value supplied', () => {
      expect(
        hexHasPrefix(false)
      ).toEqual(false);
    });
  });

  describe('hexStripPrefix', () => {
    it('returns the value as-is when no prefix', () => {
      expect(
        hexStripPrefix('01ab')
      ).toEqual('01ab');
    });

    it('returns an empty string when null value supplied', () => {
      expect(
        hexStripPrefix(null)
      ).toEqual('');
    });

    it('strips the prefix from other strings', () => {
      expect(
        hexStripPrefix('0x1223')
      ).toEqual('1223');
    });
  });
});

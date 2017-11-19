// ISC, Copyright 2017 Jaco Greeff

/* eslint-disable no-unused-expressions */

const { hexAddPrefix, hexHasPrefix, hexStripPrefix } = require('./index');

describe('hex', () => {
  describe('hexAddPrefix', () => {
    it('does not add when prefix is available', () => {
      expect(
        hexAddPrefix('0x123')
      ).to.equal('0x123');
    });

    it('adds the prefix when it is not available', () => {
      expect(
        hexAddPrefix('123')
      ).to.equal('0x123');
    });

    it('returns null as 0x', () => {
      expect(
        hexAddPrefix(null)
      ).to.equal('0x');
    });
  });

  describe('hexHasPrefix', () => {
    it('returns true when hex prefix is found', () => {
      expect(
        hexHasPrefix('0x123')
      ).to.be.true;
    });

    it('returns false when no prefix attached', () => {
      expect(
        hexHasPrefix('123')
      ).to.be.false;
    });

    it('returns false when null value supplied', () => {
      expect(
        hexHasPrefix(null)
      ).to.be.false;
    });

    it('returns false when non-string value supplied', () => {
      expect(
        hexHasPrefix(false)
      ).to.be.false;
    });
  });

  describe('hexStripPrefix', () => {
    it('returns the value as-is when no prefix', () => {
      expect(
        hexStripPrefix('01ab')
      ).to.equal('01ab');
    });

    it('returns an empty string when null value supplied', () => {
      expect(
        hexStripPrefix(null)
      ).to.equal('');
    });

    it('strips the prefix from other strings', () => {
      expect(
        hexStripPrefix('0x1223')
      ).to.equal('1223');
    });
  });
});

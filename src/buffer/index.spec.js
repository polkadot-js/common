// ISC, Copyright 2017 Jaco Greeff

/* eslint-disable no-unused-expressions */

const { bufferFromHex, bufferToHex } = require('./');

describe('buffer', () => {
  describe('bufferFromHex', () => {
    it('returns an empty buffer when null provided', () => {
      expect(
        bufferFromHex(null).length
      ).to.equal(0);
    });

    it('returns a buffer with the correct values', () => {
      expect(
        Buffer.from([128, 0, 10]).equals(
          bufferFromHex('0x80000a')
        )
      ).to.be.true;
    });

    it('throws error on non-hex inputs', () => {
      expect(
        () => bufferFromHex('notAHex')
      ).to.throw(/Cannot convert non-hex value/);
    });
  });

  describe('bufferToHex', () => {
    it('returns 0x when the buffer is null', () => {
      expect(
        bufferToHex(null)
      ).to.equal('0x');
    });

    it('returns the hex value for the buffer', () => {
      expect(
        bufferToHex(Buffer.from([128, 0, 10]))
      ).to.equal('0x80000a');
    });

    it('throws when non-buffer value is supplied', () => {
      expect(
        () => bufferToHex('noABuffer')
      ).to.throw(/Cannot convert non-buffer/);
    });
  });
});

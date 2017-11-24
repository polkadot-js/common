// ISC, Copyright 2017 Jaco Greeff

const { u8aFromBuffer, u8aToBuffer } = require('./');

describe('u8a', () => {
  describe('u8aFromBuffer', () => {
    it('returns an empty buffer when null provided', () => {
      expect(
        u8aFromBuffer(null)
      ).toEqual(new Uint8Array([]));
    });

    it('returns a Uint8Buffer with the correct values', () => {
      expect(
        u8aFromBuffer(Buffer.from([128, 0, 10]))
      ).toEqual(new Uint8Array([128, 0, 10]));
    });

    it('throws error on non-Buffer inputs', () => {
      expect(
        () => u8aFromBuffer('notBuffer')
      ).toThrow(/Cannot convert non-/);
    });
  });

  describe('u8aToBuffer', () => {
    it('returns [] when the buffer is null', () => {
      expect(
        u8aToBuffer(null)
      ).toEqual(Buffer.from([]));
    });

    it('returns the Buffer value for the Uint8Array', () => {
      expect(
        u8aToBuffer(new Uint8Array([128, 0, 10]))
      ).toEqual(Buffer.from([128, 0, 10]));
    });

    it('throws when non-Uint8Array value is supplied', () => {
      expect(
        () => u8aToBuffer('noU8A')
      ).toThrow(/Cannot convert non-Uint8Array/);
    });
  });
});

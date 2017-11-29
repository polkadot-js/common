// ISC, Copyright 2017 Jaco Greeff

const numberFromBuffer = require('./fromBuffer');
const numberFromHex = require('./fromHex');
const numberToBuffer = require('./toBuffer');
const numberToHex = require('./toHex');

describe('number', () => {
  describe('numberFromBuffer', () => {
    it('converts nothing to NaN', () => {
      expect(
        numberFromBuffer()
      ).toEqual(NaN);
    });

    it('converts empty buffer to NaN', () => {
      expect(
        numberFromBuffer(Buffer.from([]))
      ).toEqual(NaN);
    });

    it('converts a buffer to a value', () => {
      expect(
        numberFromBuffer(Buffer.from([0x12, 0x34]))
      ).toEqual(0x1234);
    });
  });

  describe('numberToBuffer', () => {
    it('converts undefined to empty', () => {
      expect(
        numberToBuffer()
      ).toEqual(Buffer.from([]));
    });

    it('converts null to empty', () => {
      expect(
        numberToBuffer(null)
      ).toEqual(Buffer.from([]));
    });

    it('converts NaN to empty', () => {
      expect(
        numberToBuffer(NaN)
      ).toEqual(Buffer.from([]));
    });

    it('converts values to the buffer', () => {
      expect(
        numberToBuffer(0x3456)
      ).toEqual(Buffer.from([0x34, 0x56]));
    });
  });

  describe('numberFromHex', () => {
    it('converts an empty to NaN', () => {
      expect(
        numberFromHex()
      ).toEqual(NaN);
    });

    it('converts to a number from hex', () => {
      expect(
        numberFromHex('0x1234')
      ).toEqual(0x1234);
    });
  });

  describe('numberToHex', () => {
    it('converts undefined to 0x', () => {
      expect(
        numberToHex()
      ).toEqual('0x');
    });

    it('converts null to 0x', () => {
      expect(
        numberToHex(null)
      ).toEqual('0x');
    });

    it('converts Nan to 0x', () => {
      expect(
        numberToHex(NaN)
      ).toEqual('0x');
    });

    it('converts 0 to 0x00', () => {
      expect(
        numberToHex(0)
      ).toEqual('0x00');
    });

    it('converts number to hex', () => {
      expect(
        numberToHex(0x1245)
      ).toEqual('0x1245');
    });
  });
});

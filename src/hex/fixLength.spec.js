// ISC, Copyright 2017 Jaco Greeff

const { hexFixLength } = require('./index');

describe('hexFixLength', () => {
  it('throws an exception on non-hex inputs', () => {
    expect(
      () => hexFixLength('notAHex')
    ).toThrow(/Expected hex input value/);
  });

  it('returns bitLength === -1 as-is', () => {
    expect(
      hexFixLength('0x12345678')
    ).toEqual('0x12345678');
  });

  it('trims values when bitLength > length', () => {
    expect(
      hexFixLength('0x12345678', 16)
    ).toEqual('0x5678');
  });

  it('adds zeros when bitLength < length', () => {
    expect(
      hexFixLength('0x1234', 32)
    ).toEqual('0x00001234');
  });

  it('does not change when bitlength === length', () => {
    expect(
      hexFixLength('0x12345678', 32)
    ).toEqual('0x12345678');
  });
});

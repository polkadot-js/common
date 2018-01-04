// ISC, Copyright 2017-2018 Jaco Greeff

const { hexAddPrefix } = require('./index');

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

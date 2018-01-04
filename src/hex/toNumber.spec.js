// ISC, Copyright 2017-2018 Jaco Greeff

const { hexToNumber } = require('./index');

describe('hexToNumber', () => {
  it('converts an empty to NaN', () => {
    expect(
      hexToNumber()
    ).toEqual(NaN);
  });

  it('converts to a number from hex', () => {
    expect(
      hexToNumber('0x1234')
    ).toEqual(0x1234);
  });
});

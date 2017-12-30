// ISC, Copyright 2017 Jaco Greeff

const { arrayFilter } = require('./index');

describe('filterArray', () => {
  it('filters arrays, removing undefined', () => {
    expect(
      arrayFilter([0, '', null, false, void 0, NaN])
    ).toEqual([0, '', null, false, NaN]);
  });

  it('filters arrays, removing undefined & null (allowNull = false)', () => {
    expect(
      arrayFilter([0, '', null, false, void 0, NaN], false)
    ).toEqual([0, '', false, NaN]);
  });
});

// ISC, Copyright 2017-2018 Jaco Greeff

const { isInstanceOf } = require('./index');

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

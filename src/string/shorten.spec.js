// ISC, Copyright 2017 Jaco Greeff

const { stringShorten } = require('./index');

describe('stringShorten', () => {
  it('returns the value as-is when <= maxLength', () => {
    expect(
      stringShorten('0123456789', 4)
    ).toEqual('0123456789');
  });

  it('returns the shortened value when > maxLength', () => {
    expect(
      stringShorten('0123456789', 3)
    ).toEqual('012..789');
  });

  it('returns undefined as undefined', () => {
    expect(
      stringShorten()
    ).toEqual('undefined');
  });

  it('returns non-string values as strings', () => {
    expect(
      stringShorten(12345678, 2)
    ).toEqual('12..78');
  });
});

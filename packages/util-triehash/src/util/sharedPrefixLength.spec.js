// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const sharedPrefixLength = require('./sharedPrefixLength');

describe('sharedPrefixLength', () => {
  it('returns 0 where no matches found', () => {
    expect(
      sharedPrefixLength([
        { k: new Uint8Array([1, 2, 3, 4, 5, 6]) },
        { k: new Uint8Array([4, 2, 3, 4, 5, 6]) }
      ])
    ).toEqual(0);
  });

  it('returns min length where match found', () => {
    expect(
      sharedPrefixLength([
        { k: new Uint8Array([1, 2, 3, 3, 5]) },
        { k: new Uint8Array([1, 2, 3]) }
      ])
    ).toEqual(3);
  });

  it('returns max length where match found', () => {
    expect(
      sharedPrefixLength([
        { k: new Uint8Array([1, 2, 3, 4, 5, 6]) },
        { k: new Uint8Array([1, 2, 3, 4, 5, 6]) }
      ])
    ).toEqual(6);
  });
});

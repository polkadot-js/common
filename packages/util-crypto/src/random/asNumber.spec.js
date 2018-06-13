// Copyright 2017-2018 @polkadot/util-crypto authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { randomAsNumber } = require('./index');

describe('randomAsNumber', () => {
  it('generates subsequent non-matching numbers', () => {
    expect(
      randomAsNumber()
    ).not.toEqual(
      randomAsNumber()
    );
  });
});

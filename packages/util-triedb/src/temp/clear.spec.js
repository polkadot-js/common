// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const memory = require('./index')();

describe('clear', () => {
  it('clears all values', () => {
    memory.set(new Uint8Array([1]), new Uint8Array([2]));
    memory.clear();

    expect(
      memory.isEmpty()
    ).toEqual(true);
  });
});

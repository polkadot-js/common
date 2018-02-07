// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const encodeHexPrefix = require('./encodeHexPrefix');

describe('encodeHexPrefix', () => {
  it('encodes [0, 0, 1, 2, 3, 4, 5], false', () => {
    expect(
      encodeHexPrefix(
        [0, 0, 1, 2, 3, 4, 5],
        false
      )
    ).toEqual(
      new Uint8Array([0x10, 0x01, 0x23, 0x45])
    );
  });

  it('encodes [0, 1, 2, 3, 4, 5], false', () => {
    expect(
      encodeHexPrefix(
        [0, 1, 2, 3, 4, 5],
        false
      )
    ).toEqual(
      new Uint8Array([0x00, 0x01, 0x23, 0x45])
    );
  });

  it('encodes [0, 1, 2, 3, 4, 5], true', () => {
    expect(
      encodeHexPrefix(
        [0, 1, 2, 3, 4, 5],
        true
      )
    ).toEqual(
      new Uint8Array([0x20, 0x01, 0x23, 0x45])
    );
  });

  it('encodes [1, 2, 3, 4, 5], true', () => {
    expect(
      encodeHexPrefix(
        [1, 2, 3, 4, 5],
        true
      )
    ).toEqual(
      new Uint8Array([0x31, 0x23, 0x45])
    );
  });

  it('encodes [1, 2, 3, 4], false', () => {
    expect(
      encodeHexPrefix(
        [1, 2, 3, 4],
        false
      )
    ).toEqual(
      new Uint8Array([0x00, 0x12, 0x34])
    );
  });

  it('encodes [4, 1], true', () => {
    expect(
      encodeHexPrefix(
        [4, 1],
        true
      )
    ).toEqual(
      new Uint8Array([0x20, 0x41])
    );
  });
});

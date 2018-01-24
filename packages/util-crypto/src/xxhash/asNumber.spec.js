// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { xxhashAsNumber } = require('./index');

describe('xxhashAsNumber', () => {
  const DATA = 'abcd';
  const DATA_ARR = [0x61, 0x62, 0x63, 0x64];
  const SEED = 0xabcd;
  const RESULT = 0xCDA8FAE4;

  it('creates the correct number output (string)', () => {
    expect(
      xxhashAsNumber(DATA, SEED)
    ).toEqual(RESULT);
  });

  it('creates the correct number output (Buffer)', () => {
    expect(
      xxhashAsNumber(Buffer.from(DATA_ARR), SEED)
    ).toEqual(RESULT);
  });

  it('creates the correct number output (Uint8Array)', () => {
    expect(
      xxhashAsNumber(Uint8Array.from(DATA_ARR), SEED)
    ).toEqual(RESULT);
  });
});

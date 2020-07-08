// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { isAscii } from '.';

describe('isAscii', (): void => {
  it('returns true for an ASCII string', (): void => {
    expect(isAscii('Hello\tWorld!\n\rTesting')).toEqual(true);
  });

  it('returns true for ASCII bytes', (): void => {
    expect(isAscii(new Uint8Array([0x31, 0x32, 0x20, 10]))).toEqual(true);
  });

  it('returns true for empty string inputs', (): void => {
    expect(isAscii('')).toEqual(true);
  });

  it('returns true for empty U8a inputs', (): void => {
    expect(isAscii(new Uint8Array())).toEqual(true);
  });

  it('returns false for empty undefined inputs', (): void => {
    expect(isAscii()).toEqual(false);
  });

  it('returns false for non-printable characters', (): void => {
    expect(isAscii(new Uint8Array([5]))).toEqual(false);
  });
});

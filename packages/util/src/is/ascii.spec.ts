// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

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

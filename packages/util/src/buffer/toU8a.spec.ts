// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { bufferToU8a } from '.';

describe('bufferToU8a', (): void => {
  it('returns an empty buffer when null provided', (): void => {
    expect(
      bufferToU8a(null)
    ).toEqual(new Uint8Array());
  });

  it('returns a Uint8Buffer with the correct values', (): void => {
    expect(
      bufferToU8a(Buffer.from([128, 0, 10]))
    ).toEqual(new Uint8Array([128, 0, 10]));
  });
});

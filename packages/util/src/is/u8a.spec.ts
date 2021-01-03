// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isU8a } from '.';

describe('isUint8Array', (): void => {
  it('returns false on undefined values', (): void => {
    expect(
      isU8a()
    ).toEqual(false);
  });

  it('returns false on Array values', (): void => {
    expect(
      isU8a([])
    ).toEqual(false);
  });

  it('returns true on Uint8Array values', (): void => {
    expect(
      isU8a(new Uint8Array())
    ).toEqual(true);
  });
});

// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isBuffer } from '.';

describe('isBuffer', (): void => {
  it('returns true when a Buffer value', (): void => {
    expect(
      isBuffer(Buffer.from([]))
    ).toEqual(true);
  });

  it('returns false on non-Buffer values', (): void => {
    expect(
      isBuffer(0)
    ).toEqual(false);
  });
});

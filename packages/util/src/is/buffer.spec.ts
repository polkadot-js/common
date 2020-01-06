// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

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

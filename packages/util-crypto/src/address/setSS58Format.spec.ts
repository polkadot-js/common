// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import encode from './encode';
import setSS58Format from './setSS58Format';

describe('setSS58Format', (): void => {
  beforeEach((): void => {
    setSS58Format(68);
  });

  it('sets and allows encoding using', (): void => {
    expect(
      encode(
        new Uint8Array([1])
      )
    ).toEqual('PqtB');
  });
});

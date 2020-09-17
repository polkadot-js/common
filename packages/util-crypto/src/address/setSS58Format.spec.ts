// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

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

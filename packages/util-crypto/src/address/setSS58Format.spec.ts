// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { encodeAddress, setSS58Format } from '.';

describe('setSS58Format', (): void => {
  beforeEach((): void => {
    setSS58Format(2);
  });

  it('sets and allows encoding using', (): void => {
    expect(
      encodeAddress(
        new Uint8Array([1])
      )
    ).toEqual('g4b');
  });
});

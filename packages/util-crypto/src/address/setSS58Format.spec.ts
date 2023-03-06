// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { encodeAddress, setSS58Format } from '.';

describe('setSS58Format', (): void => {
  beforeEach((): void => {
    // eslint-disable-next-line deprecation/deprecation
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

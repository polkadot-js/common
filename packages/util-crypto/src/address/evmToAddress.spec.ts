// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { evmToAddress } from './index.js';

describe('evmToAddress', (): void => {
  it('creates a valid known SS58 address', (): void => {
    expect(
      evmToAddress('0xd43593c715fdd31c61141abd04a99fd6822c8558', 42, 'blake2')
    ).toEqual('5FrLxJsyJ5x9n2rmxFwosFraxFCKcXZDngRLNectCn64UjtZ');
  });

  it('fails when length is invalid', (): void => {
    expect(
      () => evmToAddress('0x1234567890ABCDEF1234567890ABCDEF')
    ).toThrow(/address length/);
  });
});
